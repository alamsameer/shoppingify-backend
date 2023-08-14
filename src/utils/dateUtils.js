function isSameDay(currentDate, purchaseHistory) {
    console.log("i am in checking mode");
    for (const [index, history] of purchaseHistory.entries()){
        console.log(history);
        const item=history.date;
        const condDate=(item.getDay()===currentDate.getDay() && item.getMonth()===currentDate.getMonth() && item.getFullYear()===currentDate.getFullYear());
        if(condDate){
            return [true,index];
        }
    }
    return false;
}

export { isSameDay };