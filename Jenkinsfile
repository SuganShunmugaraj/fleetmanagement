pipeline {
   agent {
       node { label 'docker && !azure' }
   }
   environment {
       appVersion = ''
       imageName = ''
   }
   stages {
       stage('Checkout'){
	      steps {
	        cleanWs()
	        checkout scm
	      }
	    }
	    stage('Build'){
	      steps {
	        script {
				def nodejs = tool name: 'node-9.6.1', type: 'nodejs'
				withEnv(["PATH+NODEJS=${nodejs}/bin", "HTTP_PROXY=http://proxy.devops.kion.cloud:8080", "HTTPS_PROXY=http://proxy.devops.kion.cloud:8080"]) {
		            echo env.PATH
		              configFileProvider([configFile(fileId: 'npmrc_with_proxy', targetLocation: '.npmrc')]) {
		    			sh "node -v"
			        	sh "npm -v"
			        	sh "npm install"
		            }
		          }
	        }
	      }
	    }
        stage('Docker Build & Push') {
            steps {
                script {
                    def packageJson = readJSON file: 'package.json'
                    appVersion = packageJson.version
                    def TIMESTAMP = sh label: '', returnStdout: true, script: 'date "+%Y%m%d%H%M"'
                    TIMESTAMP = TIMESTAMP.trim()
                    def dockerTag = appVersion
                    imageName = "e2r2s04pacrnxtfl01.azurecr.io/nexxtfleet/workshopservice-ui:${dockerTag}"
                    mergeDockerConfigAuth fileCredentialIds: ['dockerconfigjson-prd'], script: {
                        pathToConfig ->
                        sh """#!/bin/bash
                            docker --config ${pathToConfig} build --build-arg ${appVersion} -t ${imageName} .
                            docker --config ${pathToConfig} push ${imageName}
                            docker --config ${pathToConfig} rmi ${imageName}
                        """
                    }
                    currentBuild.description = "${imageName}"
                }
            }
        }
        
        stage('Trigger Dev Deployment'){
            steps {
                build job: '../10_deployment_dev', 
                    parameters: [[$class: 'StringParameterValue', name: 'appversion', value: appVersion]], 
                    wait: false
            }
        }
        
   }
   post {
       always {
           echo 'Finished! Cleaning up...'
           cleanWs()
           emailext attachLog: true, compressLog:true, body: '$DEFAULT_CONTENT', replyTo: '$DEFAULT_REPLYTO', subject: '$DEFAULT_SUBJECT', to: 'veeravadivel.balasubramanian@dxc.com karunakaran.l@dxc.com premkumar.h@dxc.com subramanian.nallathambi@dxc.com vinoth.krishnan@dxc.com mmuthukumar@dxc.com rajeshwarir@dxc.com sathiyaseelan.raveendran@dxc.com hajrul.aswath-b@dxc.com nithiyanandam.s@dxc.com tanaki.raghava-rao@dxc.com'
       }
   }
}