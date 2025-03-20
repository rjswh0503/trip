class HttpError extends Error {
    //constructor는 생성자이며 인자값(message, errorCode)을 받는 생성자 생성
    constructor(message, errorCode) {
        super(message); // 메세지 속성 추가
        this.code = errorCode; // 코드 속성 추가 

    }

}


// 밖으로 내보냄
module.exports = HttpError;
