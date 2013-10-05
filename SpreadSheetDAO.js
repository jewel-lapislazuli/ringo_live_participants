var SPREADSHEET_ID = '0AlInPkjPxmSkdHV4VmF4YU1fMVJXbk9sdDVlS2RKekE';
var PARTICIPATIONDATA_SHEETNAME = '参戦データ';
var USERDATA_SHEETNAME = 'ユーザ情報';

var LIVE_DATEINFO = {'11/18': 0, '11/19': 1, '11/20': 2, '11/25': 3, '11/26': 4, '11/28': 5, '11/29': 6};

var DATEINDEX_DEFAULT_VALUE = -1
var MAX_TWITTERNAME_LENGTH = 15;
var MAX_USERNAME_LENGTH = 20;

var ERROR_TOO_MANY_USERS = -1;
var ERROR_TOO_MANY_PARTICIPANTS = -2;
var ERROR_USER_NOT_FOUND = -3;
var ERROR_PARTICIPATIONDATA_NOT_FOUND = -4;
var ERROR_PARTICIPATIONDATA_ALREADY_REGISTERD = -5;
var ERROR_USERDATA_ALREADY_REGISTERED = -6;
var ERROR_ILLEGAL_DATE = -10;
var ERROR_ILLEGAL_TWITTERUSERNAME = -11;
var ERROR_ILLEGAL_USERNAME = -12;
var ERROR_DATE_NOT_SPECIFIED = -13;
var ERROR_TWITTERUSERNAME_NOT_SPECIFIED = -14;
var ERROR_USERNAME_NOT_SPECIFIED = -15;

function ParticipationInfo_(twitterUserName, userName, dateIndex){
    this.twitterUserName = twitterUserName;
    this.userName = userName;
    this.dateIndex = dateIndex;
}

function FormInputData(twitterUserName, userName, dateIndex){
    this.twitterUserName = twitterUserName;
    this.userName = userName;
    this.dateIndex = dateIndex;

    this.validateDataOnRegist = function(){
        var result = this.validateDataOnDelete();
        if(result != 0){
            return result;
        }
        if(this.userName.length == 0){
            return ERROR_USERNAME_NOT_SPECIFIED;
        }
    }

    this.validateDataOnDelete = function(){
        if(this.dateIndex == DATEINDEX_DEFAULT_VALUE){
            return ERROR_DATE_NOT_SPECIFIED;
        }
        if(this.twitterUserName.length == 0){
            return ERROR_TWITTERUSERNAME_NOT_SPECIFIED;
        }
    }
}

function ParticipationSheet_(spreadsheet){
    this.sheet = spreadsheet.getSheetByName(PARTICIPATIONDATA_SHEETNAME);
    this.rowIndex = 1;
    this.rowLength = 22;
    this.columnIndex = 1;
    this.columnLength = 7;
    this.range = this.sheet.getRange(this.rowIndex, this.columnIndex, this.rowLength, this.columnLength);
    this.values = this.range.getValues();

    this.registParticipationInfo = function(pInfo){
        var columnIndex = pInfo.dateIndex;
        var updateData = false;

        for(var i = 0; i < this.rowLength; i++){
            if(this.values[i][columnIndex] == pInfo.twitterUserName){
                return ERROR_PARTICIPATIONDATA_ALREADY_REGISTERD;
            }

            if(this.values[i][columnIndex] == '' || this.values[i][columnIndex] == undefined){
                this.values[i][columnIndex] = pInfo.twitterUserName;
                updateData = true;
                break;
            }
        }

        if(updateData == false){
            return ERROR_TOO_MANY_PARTICIPANTS;
        }

        this.range.setValues(this.values);
        return 0;
    }

    this.deleteParticipationInfo = function(pInfo){
        var columnIndex = pInfo.dateIndex;
        var deleteData = false;

        for(var i = 0; i < this.rowLength; i++){
            if(this.values[i][columnIndex] == pInfo.twitterUserName){
                this.values[i][columnIndex] = '';
                deleteData = true;
                break;
            }
        }

        if(deleteData == false){
            return PARTICIPANTDATA_NOT_FOUND;
        }

        this.range.setValues(this.values);
        return 0;
    }
}

function UserDataSheet_(spreadsheet){
    this.sheet = spreadsheet.getSheetByName(USERDATA_SHEETNAME);
    this.rowIndex = 1;
    this.rowLength = 100;
    this.columnIndex = 1;
    this.columnLength = 2;
    this.range = this.sheet.getRange(this.rowIndex, this.columnIndex, this.rowLength, this.columnLength);
    this.values = this.range.getValues();

    this.registUserdata = function(pInfo){
        for(var i = 0; i < this.rowLength; i++){
            if(this.values[i][0] == pInfo.twitterUserName){
                return ERROR_USERDATA_ALREADY_REGISTERED;
            }

            if(this.values[i][0] == '' || this.values[i][0] == undefined){
                this.values[i][0] = pInfo.twitterUserName;
                this.values[i][1] = pInfo.userName;
                insertData = true;
                break;
            }
        }

        if(insertData = false){
            return ERROR_TOO_MANY_USERS;
        }

        this.range.setValues(this.values);
        return 0;
    }
}

function registParticipationInfo(pInfo){
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var psheet = new ParticipationSheet_(spreadsheet);
    var usheet = new UserDataSheet_(spreadsheet);

    var uresult = usheet.registUserdata(pInfo);
    var presult = psheet.registParticipationInfo(pInfo);
}

function deleteParticipationInfo(pInfo){
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var psheet = new ParticipationSheet_(spreadsheet);

    var presult = psheet.deleteParticipationInfo(pInfo);
}
