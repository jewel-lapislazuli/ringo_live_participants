var SPREADSHEET_ID = '0AlInPkjPxmSkdHV4VmF4YU1fMVJXbk9sdDVlS2RKekE';
var PARTICIPATIONDATA_SHEETNAME = '参戦データ';
var USERDATA_SHEETNAME = 'ユーザ情報';

var LIVE_DATEINFO = {'11/18': 0, '11/19': 1, '11/20': 2, '11/25': 3, '11/26': 4, '11/28': 5, '11/29': 6};

var DATEINDEX_DEFAULT_VALUE = -1;
var MAX_TWITTERNAME_LENGTH = 15;
var MAX_USERNAME_LENGTH = 20;

var TYPE_REGIST = 1;
var TYPE_DELETE = 2;

var ERROR_TOO_MANY_USERS = -1;
var ERROR_TOO_MANY_PARTICIPANTS = -2;
var ERROR_PARTICIPATIONDATA_NOT_FOUND = -3;
var ERROR_PARTICIPATIONDATA_ALREADY_REGISTERD = -4;
var ERROR_TOO_LONG_TWITTERUSERNAME = -10;
var ERROR_TOO_LONG_USERNAME = -11;
var ERROR_DATE_NOT_SPECIFIED = -12;
var ERROR_TWITTERUSERNAME_NOT_SPECIFIED = -13;
var ERROR_USERNAME_NOT_SPECIFIED = -14;

function getErrorMessage(errorCode){
    switch(errorCode){
        case ERROR_TOO_MANY_USERS:
        return '登録ユーザ数がいっぱいになりました。管理者( @jwl_lapislazuli )への連絡をお願いします。'

        case ERROR_TOO_MANY_PARTICIPANTS:
        return '1日あたりの参戦ユーザ数がいっぱいになりました。管理者( @jwl_lapislazuli )への連絡をお願いします。'

        case ERROR_PARTICIPATIONDATA_NOT_FOUND:
        return '入力した参戦情報は登録されていません。'

        case ERROR_PARTICIPATIONDATA_ALREADY_REGISTERD:
        return '入力した参戦情報は既に登録されています。'

        case ERROR_TOO_LONG_TWITTERUSERNAME:
        return 'Twitterユーザ名が長すぎます。'

        case ERROR_TOO_LONG_USERNAME:
        return 'ユーザ名が長すぎます。'

        case ERROR_DATE_NOT_SPECIFIED:
        return '参戦日を入力してください。'

        case ERROR_TWITTERUSERNAME_NOT_SPECIFIED:
        return 'Twitterユーザ名を入力してください。'

        case ERROR_USERNAME_NOT_SPECIFIED:
        return 'ユーザ名を入力してください。'

        default:
        return 'エラーが発生しました。'
    }
}

function trimTwitterUserNamePrefix(twitterUserName){
    return twitterUserName.replace(/^@/,'');
}

function ParticipationInfo_(twitterUserName, userName, dateIndex){
    this.twitterUserName = twitterUserName.replace(/^=/,'\'=');
    this.userName = userName.replace(/^=/,'\'=');
    this.dateIndex = dateIndex;
}

function FormInputData(twitterUserName, userName, dateIndex){
    this.twitterUserName = twitterUserName;
    this.userName = userName;
    this.dateIndex = dateIndex;

    this.validateDataOnRegist = function(){
        var result = 0;

        result = this.validateDateIndex();
        if(result != 0){
            return result;
        }

        result = this.validateTwitterUserName();
        if(result != 0){
            return result;
        }

        result = this.validateUserName();
        if(result != 0){
            return result;
        }

        return 0;
    }

    this.validateDataOnDelete = function(){
        var result = 0;

        result = this.validateDateIndex();
        if(result != 0){
            return result;
        }

        result = this.validateTwitterUserName();
        if(result != 0){
            return result;
        }

        return 0;
    }

    this.validateDateIndex = function(){
        if(this.dateIndex == DATEINDEX_DEFAULT_VALUE){
            return ERROR_DATE_NOT_SPECIFIED;
        }

        return 0;
    }

    this.validateTwitterUserName = function(){
        if(this.twitterUserName.length == 0){
            return ERROR_TWITTERUSERNAME_NOT_SPECIFIED;
        }
        if(this.twitterUserName.length > MAX_TWITTERNAME_LENGTH){
            return ERROR_TOO_LONG_TWITTERUSERNAME;
        }

        return 0;
    }

    this.validateUserName = function(){
        if(this.userName.length == 0){
            return ERROR_USERNAME_NOT_SPECIFIED;
        }
        if(this.userName.length > MAX_USERNAME_LENGTH){
            return ERROR_TOO_LONG_USERNAME;
        }

        return 0;
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
            return ERROR_PARTICIPATIONDATA_NOT_FOUND;
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
                return 0;
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

    var result = null;

    result = usheet.registUserdata(pInfo);
    if(result != 0){
        return result;
    }

    result = psheet.registParticipationInfo(pInfo);
    if(result != 0){
        return result;
    }

    return 0;
}

function deleteParticipationInfo(pInfo){
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var psheet = new ParticipationSheet_(spreadsheet);

    var result = null;

    result = psheet.deleteParticipationInfo(pInfo);
    if(result != 0){
        return result;
    }

    return 0;
}
