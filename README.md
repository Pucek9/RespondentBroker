Respondent Broker

Use https://angular-meteor.com/ 

To run app server working with local lan mobile devices:
Windows: 
    //set MY_IP=(for /f "tokens=2 delims=[]" %a in ('ping -n 1 -4 "%computername%"') do @echo %a)
    set ROOT_URL=http://%MY_IP%:3000
    meteor run --mobile-server=%ROOT_URL%
Linux: 
    export ROOT_URL=http://MY_IP_ADDRESS:3000
    meteor run --mobile-server=http://MY_IP_ADDRESS:3000
   
   
set ROOT_URL=http://192.168.0.143:3000
meteor run --mobile-server=%ROOT_URL%