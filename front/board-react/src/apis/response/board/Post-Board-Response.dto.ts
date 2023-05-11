interface Dto {
    board: {
        boardNumber : number;
        boardContent : string;
        boardImgUrl1 : string;
        boardImgUrl2 : string | null;
        boardImgUrl3 : string | null;
        tag : string;
        boardWriteTime : string;
        writerEmail : string;
        writerNickname : string;
        writerProfileUrl : string | null;
        commentCount : number;
        likeCount : number;
        viewCount : number;
    };
    commentList : [
      {
        boardNumber : number;
        commentNumber : number;
        writerEmail : string;
        writerNickname : string;
        writerProfileUrl : string | null;
        writerDate : string;
        commentContent : number;
      }
    ];
    likeList : [
      {
        boardNumber : number;
        userEmail : string;
        userNickname : string;
        userProfileUrl : string | null;
      }
    ];
    // productList : [
    //   {
    //     productName: string;
    //     productPrice: string;
    //     productUrl: string;
    //     productImgUrl: string;
    //   }
    // ]
}

export default Dto;