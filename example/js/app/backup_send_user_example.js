// prepair the hash
hash = {};
hash['user'] = {}; 

// Storage the Hash
hash['user']['social_session'] = JSON.parse(localStorage.usuario);

// Send it hash
$.post('http://localhost:4000/api/system/signup_signin', hash, function(data){
    console.log(data);
});