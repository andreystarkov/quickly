import {getHistory} from "./engine/getHistory.jsx";

$(function() {
    getHistory(function(data){
        var historyData = data.orders;
        $.each(historyData, function(index,value){
            console.log('historyData: ', value);
        });
    });
});
