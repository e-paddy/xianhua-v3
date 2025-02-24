const flowerRecordsKey = 'flowerRecords';
const thisRecordKey = 'thisRecord';

let flowerRecords = JSON.parse(localStorage.getItem(flowerRecordsKey)) || [];

const ThisRecord = JSON.parse(localStorage.getItem(thisRecordKey)) || {
    mourningWords: "",
    flower: "",
    signature: ""
};

function saveToLocalStorage() {
    localStorage.setItem(flowerRecordsKey, JSON.stringify(flowerRecords));
    localStorage.setItem(thisRecordKey, JSON.stringify(ThisRecord));
}

function addFlowerRecord(recordToAdd) {
    if (typeof recordToAdd === 'object' && recordToAdd !== null) {
        flowerRecords.push(recordToAdd);
        saveToLocalStorage();
    } else {
        console.error('记录格式无效。请提供一个JSON对象。');
    }
}

function setThisRecordField(fieldName, value) {
    if (ThisRecord.hasOwnProperty(fieldName)) {
        ThisRecord[fieldName] = value;
        saveToLocalStorage();
    } else {
        console.error(`字段 ${fieldName} 不存在于 record 对象中。`);
    }
}

function clearThisRecord() {
    ThisRecord.mourningWords = "";
    ThisRecord.flower = "";
    ThisRecord.signature = "";
    saveToLocalStorage();
}

function addRecordToFlowerRecords() {
    const recordCopy = { ...ThisRecord }; // 创建记录副本以避免参考问题
    if (flowerRecords.length >= 10) {
        flowerRecords.shift(); //如果数组已满，则删除最旧的记录
    }
    flowerRecords.push(recordCopy); // 将新记录添加到数组末尾
    saveToLocalStorage();
    console.log('Record added:', recordCopy);
    console.log('Current flowerRecords:', flowerRecords);
}

function getThisRecord() {
    return ThisRecord;
}


window.addFlowerRecord = addFlowerRecord;
window.setThisRecordField = setThisRecordField;
window.clearThisRecord = clearThisRecord;
window.addRecordToFlowerRecords = addRecordToFlowerRecords;
window.flowerRecords = flowerRecords;
window.ThisRecord = ThisRecord;
window.getThisRecord = getThisRecord;
