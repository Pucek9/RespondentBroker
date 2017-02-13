Respondent Broker uses https://angular-meteor.com/ 

To run app change directory to app and type in console:
    meteor run

To run app server working with file sharing local lan mobile devices:
Windows: 
    set ROOT_URL=http://<MY_IP_ADDRESS>:3000
    meteor run --mobile-server=%ROOT_URL%
Linux: 
    export ROOT_URL=http://<MY_IP_ADDRESS>:3000
    meteor run --mobile-server=http://<MY_IP_ADDRESS>:3000