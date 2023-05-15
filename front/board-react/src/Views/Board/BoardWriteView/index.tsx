import { ChangeEvent, KeyboardEvent, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios, { AxiosResponse } from 'axios';

import { Box, Fab, Input, Divider, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { FILE_UPLOAD_URL, POST_BOARD_URL, authorizationHeader, mutipartHeader } from 'src/constants/api';
import { PostBoardDto } from 'src/apis/request/board';
import { PostBoardResponseDto } from 'src/apis/response/board';
import ResponseDto from 'src/apis/response';

export default function BoardWriteView() {
    // hook //
    const navigator = useNavigate();

    const imageRef = useRef<HTMLInputElement | null>(null);
    
    const [cookies] = useCookies();
    const [boardContent, setBoardContent] = useState<string>('');
    const [boardImgUrl1, setBoardImgUrl] = useState<string>('');
    //? 업로드하면 어떻게 들어가는지 잘 몰겠음
    const [boardImgUrl2, setBoardImgUrl2] = useState<string>('');
    const [boardImgUrl3, setBoardImgUrl3] = useState<string>('');
    const [tag, setTag] = useState<string>('');

    const accessToken = cookies.accessToken;

    // event handler //
    const onBoardContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setBoardContent(value);
    } 
    const onBoardContentKeyPressHandler = (event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        setBoardContent(boardContent + '/n');
    }
    const onBoardImageUploadButtonHandler = () => {
        if (!imageRef.current) return;
        imageRef.current.click();
    }
    const onBoardImageUploadChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const data = new FormData();
        data.append('file', event.target.files[0]);

        axios.post(FILE_UPLOAD_URL, data, mutipartHeader())
            .then((response) => boardImageUploadResponseHandler(response))
            .catch((error) => boardImageUploadErrorHandler(error))
    }

    const onTagChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setTag(value);
    }

    const onBoardWriteHandler = () => {
        if (!boardImgUrl1.trim() || !boardContent.trim()) {
            alert('모든 내용을 작성해주세요!');
            return;
        }
        postBoard();
    }

    const postBoard = () => {
        const data: PostBoardDto= { boardContent, boardImgUrl1, boardImgUrl2, boardImgUrl3, tag};

        axios.post(POST_BOARD_URL, data, authorizationHeader(accessToken))
            .then((response) => postBoardResponseHandler(response))
            .catch((error) => postBoardErrorHandler(error))
    }

    // response handler //
    const boardImageUploadResponseHandler = (response: AxiosResponse<any, any>) => {
        const imageUrl = response.data as string;
        if (!imageUrl) return;
        setBoardImgUrl(imageUrl);
    }

    const postBoardResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<PostBoardResponseDto>
        if (!result || !data) {
            alert(message);
            return;
        }
        navigator('/');
    }

    // error handler //
    const postBoardErrorHandler = (error: any) => {
        console.log(error.message);
    }
    const boardImageUploadErrorHandler = (error: any) => {
        console.log(error.message);
    }

  return (
    <Box sx={{ paddingTop: '100px' }}>
        {/* //? 게시물 본문 */}
        <Box sx={{ width: '100%', display: 'block', textAlign: 'center' }}>
            {/* //? 본문 사진 업로드 : 왜 이렇게는 되는거지 */}
            <Box sx= {{ p: '15px 0' }}>
                <Box sx={{ width: '100%'}} >
                    <Box sx={{ width: '50%' }} component='img' src={boardImgUrl1} />
                </Box>
            </Box>  

            <Box sx={{ display: 'block-flex', justifyContent: 'center', mt: '45px', ml: '225px', p: '15px 0px', width: '70%', border: 0.3, borderRadius: 0.5, backgroundColor: 'rgba(0, 0, 0, 0.02)'}}>
                {/* //? 스타일 태그 */}
                <Typography sx={{ m: '4px 10px 0 20px' }} >스타일 :</Typography>
                <Input disableUnderline sx={{ mr: '10px' ,border: 0.05, width: '130px', height: '25px' }} onChange={(event) => onTagChangeHandler(event)} />           
                {/* //? 본문 내용 입력 */}
                <Input sx={{ width: '800px' }} minRows={12} fullWidth multiline disableUnderline placeholder='내용을 입력하세요'
                    onChange={(event) => onBoardContentChangeHandler(event)}
                    onKeyDown={(event) => onBoardContentKeyPressHandler(event)} />
            </Box>         
        </Box>
        <Divider sx={{ m: '40px 0' }} />
        
            <Fab sx={{ position: 'fixed', bottom: '250px', right: '100px' }} onClick={() => onBoardImageUploadButtonHandler()}>
                <AddAPhotoIcon  />
                <input ref={imageRef} hidden type='file' accept='image/*' onChange={(event) => onBoardImageUploadChangeHandler(event)}/>           
            </Fab>

            <Fab sx={{ position: 'fixed', bottom: '150px', right: '100px' }} onClick={() => onBoardWriteHandler()}>
                <CreateIcon />
            </Fab>
    </Box>
  )

  // todo : BoardWriteView - ProductWriteView로 나누고 router에서 각각 받아오는게 나은가? //
}
