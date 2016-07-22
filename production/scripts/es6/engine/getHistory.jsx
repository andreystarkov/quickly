export function getHistory(callback){
    $.getJSON(serverUrl+'/api/v2/history/orders/'+userToken, function(data){
        console.log('getHistory: ', data);
        callback = data.result;
    });
}
