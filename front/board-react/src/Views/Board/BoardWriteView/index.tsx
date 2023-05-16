import { ChangeEvent, KeyboardEvent, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios, { AxiosResponse } from 'axios';

import { Box, Fab, Input, Divider, Typography, IconButton, Card } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { FILE_UPLOAD_URL, POST_BOARD_URL, POST_PRODUCT_URL, authorizationHeader, mutipartHeader } from 'src/constants/api';
import { PostBoardDto, PostProductDto } from 'src/apis/request/board';
import { PostBoardResponseDto } from 'src/apis/response/board';
import ResponseDto from 'src/apis/response';

export default function BoardWriteView() {
    // hook //
    const navigator = useNavigate();

    const imageRef = useRef<HTMLInputElement | null>(null);
    const imageRef2 = useRef<HTMLInputElement | null>(null);
    const imageRef3 = useRef<HTMLInputElement | null>(null);
    const productImgRef = useRef<HTMLInputElement | null>(null);

    const [cookies] = useCookies();
    const [boardContent, setBoardContent] = useState<string>('');
    const [boardImgUrl1, setBoardImgUrl] = useState<string>('');
    //? handler여러개 만들어야 이미지 여러개 들어가는듯
    const [boardImgUrl2, setBoardImgUrl2] = useState<string>('');
    const [boardImgUrl3, setBoardImgUrl3] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    const [productImgUrl, setProductImgUrl] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [productPrice, setProductPrice] = useState<string>('');
    const [productUrl, setProductUrl] = useState<string>('');

    const accessToken = cookies.accessToken;

    // event handler //
    const onBoardContentKeyPressHandler = (event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        setBoardContent(boardContent + '/n');
    }
    const onProductImageUploadButtonHandler = () => {
        if (!productImgRef.current) return;
        productImgRef.current.click();
    }

    const onBoardImageUploadButtonHandler = () => {
        if (!imageRef.current) return;
        imageRef.current.click();
    }
    const onBoardImageUploadButtonHandler2 = () => {
        if (!imageRef2.current) return;
        imageRef2.current.click();
    }
    const onBoardImageUploadButtonHandler3 = () => {
        if (!imageRef3.current) return;
        imageRef3.current.click();
    }

    const onBoardImageUploadChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const data = new FormData();
        data.append('file', event.target.files[0]);
        axios.post(FILE_UPLOAD_URL, data, mutipartHeader())
            .then((response) => boardImageUploadResponseHandler(response))
            .catch((error) => boardImageUploadErrorHandler(error))
    }
    const onBoardImageUploadChangeHandler2 = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const data = new FormData();
        data.append('file', event.target.files[0]);
        axios.post(FILE_UPLOAD_URL, data, mutipartHeader())
            .then((response2) => boardImageUploadResponseHandler2(response2))
            .catch((error) => boardImageUploadErrorHandler(error))
    }
    const onBoardImageUploadChangeHandler3 = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const data = new FormData();
        data.append('file', event.target.files[0]);
        axios.post(FILE_UPLOAD_URL, data, mutipartHeader())
            .then((response3) => boardImageUploadResponseHandler3(response3))
            .catch((error) => boardImageUploadErrorHandler(error))
    }

    const onProductImageUploadChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const data = new FormData();
        data.append('file', event.target.files[0]);
        axios.post(FILE_UPLOAD_URL, data, mutipartHeader())
            .then((response) => productImageUploadResponseHandler(response))
            .catch((error) => productImageUploadErrorHandler(error))
    }
    const onBoardContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setBoardContent(value);
    }
    const onTagChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setTag(value);
    }
    const onProductNameChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setProductName(value);
    }
    const onProductPriceChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setProductPrice(value + '원');
    }
    const onProductUrlChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setProductUrl(value);
    }

    const onBoardWriteHandler = () => {
        if (!boardImgUrl1.trim() || !boardContent.trim() || !productImgUrl.trim() || !productName.trim() || !productPrice.trim() || !productUrl.trim()) {
            alert('모든 내용을 작성해주세요!');
            return;
        }
        postBoard();
    }
    const postBoard = () => {
        const data: PostBoardDto & PostProductDto = { boardContent, boardImgUrl1, boardImgUrl2, boardImgUrl3, tag, productName, productPrice, productUrl, productImgUrl };

        axios.post(POST_BOARD_URL && POST_PRODUCT_URL, data, authorizationHeader(accessToken))
            .then((response) => postBoardResponseHandler(response))
            .catch((error) => postBoardErrorHandler(error))
    }

    // response handler //
    const boardImageUploadResponseHandler = (response: AxiosResponse<any, any>) => {
        const imageUrl = response.data as string;
        if (!imageUrl) return;
        setBoardImgUrl(imageUrl);
    }
    const boardImageUploadResponseHandler2 = (response: AxiosResponse<any, any>) => {
        const imageUrl2 = response.data as string;
        if (!imageUrl2) return;
        setBoardImgUrl2(imageUrl2);
    }
    const boardImageUploadResponseHandler3 = (response: AxiosResponse<any, any>) => {
        const imageUrl3 = response.data as string;
        if (!imageUrl3) return;
        setBoardImgUrl3(imageUrl3);
    }

    const postBoardResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<PostBoardResponseDto>
        if (!result || !data) {
            alert(message);
            return;
        }
        navigator('/');
    }
    const productImageUploadResponseHandler = (response: AxiosResponse<any, any>) => {
        const productImgUrl = response.data as string;
        if (!productImgUrl) return;
        setProductImgUrl(productImgUrl);
    }

    // error handler //
    const postBoardErrorHandler = (error: any) => {
        console.log(error.message);
    }
    const boardImageUploadErrorHandler = (error: any) => {
        console.log(error.message);
    }
    const productImageUploadErrorHandler = (error: any) => {
        console.log(error.message);
    }

    return (
        <Box sx={{ paddingTop: '100px' }}>
            {/* //? 게시물 본문 */}
            <Box sx={{ width: '100%', display: 'block', textAlign: 'center' }}>
                {/* //? 본문 사진 업로드 : 여러 박스에 올리려면 어떻게 해야하는가 */}
                <Box sx={{ p: '15px 0' }}>
                    <Box sx={{ width: '100%' }} >
                        <Box sx={{ width: '50%' }} component='img' src={boardImgUrl1} />
                    </Box>
                    <Box sx={{  }}>
                        <IconButton onClick={() => onBoardImageUploadButtonHandler()} >
                            <AddAPhotoIcon />
                            <input ref={imageRef} hidden type='file' accept='image/*' onChange={(event) => onBoardImageUploadChangeHandler(event)} />
                        </IconButton>
                    </Box>
                </Box>
                <Divider sx={{ m: '40px 0' }} />
                <Box sx={{ p: '15px 0' }}>
                    <Box sx={{ width: '100%' }} >
                        <Box sx={{ width: '50%' }} component='img' src={boardImgUrl2} />
                    </Box>
                    <Box sx={{  }}>
                        <IconButton onClick={() => onBoardImageUploadButtonHandler2()} >
                            <AddAPhotoIcon />
                            <input ref={imageRef2} hidden type='file' accept='image/*' onChange={(event) => onBoardImageUploadChangeHandler2(event)} />
                        </IconButton>
                    </Box>
                </Box>
                <Divider sx={{ m: '40px 0' }} />
                <Box sx={{ p: '15px 0' }}>
                    <Box sx={{ width: '100%' }} >
                        <Box sx={{ width: '50%' }} component='img' src={boardImgUrl3} />
                    </Box>
                    <Box sx={{  }}>
                        <IconButton onClick={() => onBoardImageUploadButtonHandler3()} >
                            <AddAPhotoIcon />
                            <input ref={imageRef3} hidden type='file' accept='image/*' onChange={(event) => onBoardImageUploadChangeHandler3(event)} />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ display: 'block-flex', justifyContent: 'center', mt: '45px', ml: '225px', p: '15px 0px', width: '70%', border: 0.3, borderRadius: 0.5, backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
                    {/* //? 스타일 태그 */}
                    <Typography sx={{ m: '4px 10px 0 20px' }} >스타일 :</Typography>
                    <Input disableUnderline sx={{ mr: '10px', border: 0.05, width: '130px', height: '25px' }} onChange={(event) => onTagChangeHandler(event)} />
                    {/* //? 본문 내용 입력 */}
                    <Input sx={{ width: '800px' }} minRows={12} fullWidth multiline disableUnderline placeholder='내용을 입력하세요'
                        onChange={(event) => onBoardContentChangeHandler(event)}
                        onKeyDown={(event) => onBoardContentKeyPressHandler(event)} />
                </Box>
            </Box>

            <Divider sx={{ m: '40px 0' }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '100px', pl: '450px', width: '1000px' }}>
                {/* //? 상품 업로드 박스 */}
                <Box >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* //? 상품 등록박스1 */}
                        <Box sx={{ p: '15PX 15px', width: '235px', height: '285px', border: 0.3, borderRadius: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ p: '15px 0' }}>
                                    <Box sx={{ width: '100%'}} >
                                        <Box sx={{ width: '100%', position: 'relative', zIndex: '1'  }} component='img' src={productImgUrl} />
                                    </Box>
                                </Box>

                                <Box sx={{ position: 'relative', zIndex: '1'  }}>
                                    <IconButton onClick={() => onProductImageUploadButtonHandler()} >
                                        <AddAPhotoIcon />
                                        <input ref={productImgRef} hidden type='file' accept='image/*' onChange={(event) => onProductImageUploadChangeHandler(event)} />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box sx={{ ml: '5px', mt: '15px' }}>
                                <Input sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 이름'
                                    onChange={(event) => onProductNameChangeHandler(event)} />
                                <Input sx={{ mt: '10px', backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 가격'
                                    onChange={(event) => onProductPriceChangeHandler(event)} />
                                {/* //? url 이동 되는건가? */}
                                <Input sx={{ mt: '10px', mr: '5px', backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 구매 Url' type='url'
                                    onChange={(event) => onProductUrlChangeHandler(event)} />
                            </Box>
                        </Box >
                        {/* //? 상품 등록박스2 */}
                        <Box sx={{ p: '15PX 15px', width: '235px', height: '285px', border: 0.3, borderRadius: 1 }}>
                            <Box>
                                <Box>
                                    <Card sx={{ width: '235px', height: '150px', backgroundColor: 'yellow', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' }}>
                                        <IconButton onClick={() => onProductImageUploadButtonHandler()} >
                                            <AddAPhotoIcon />
                                            <input ref={productImgRef} hidden type='file' accept='image/*' onChange={(event) => onProductImageUploadChangeHandler(event)} />
                                        </IconButton>
                                    </Card>
                                </Box>
                            </Box>
                            <Box sx={{ ml: '5px', mt: '15px' }}>
                                <Input sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 이름'
                                    onChange={(event) => onProductNameChangeHandler(event)} />
                                <Input sx={{ mt: '10px', backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 가격'
                                    onChange={(event) => onProductPriceChangeHandler(event)} />
                                <Input sx={{ mt: '10px', mr: '5px', backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 구매 Url' type='url'
                                    onChange={(event) => onProductUrlChangeHandler(event)} />
                            </Box>
                        </Box>
                        {/* //? 상품 등록박스3 */}
                        <Box sx={{ p: '15PX 15px', width: '235px', height: '285px', border: 0.3, borderRadius: 1 }}>
                            <Box>
                                <Card sx={{ width: '235px', height: '150px', backgroundColor: 'yellow', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' }}>
                                    <IconButton onClick={() => onProductImageUploadButtonHandler()} >
                                        <AddAPhotoIcon />
                                        <input ref={productImgRef} hidden type='file' accept='image/*' onChange={(event) => onProductImageUploadChangeHandler(event)} />
                                    </IconButton>
                                </Card>
                            </Box>
                            <Box sx={{ ml: '5px', mt: '15px' }}>
                                <Input sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 이름'
                                    onChange={(event) => onProductNameChangeHandler(event)} />
                                <Input sx={{ mt: '10px', backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 가격'
                                    onChange={(event) => onProductPriceChangeHandler(event)} />
                                <Input sx={{ mt: '10px', mr: '5px', backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 구매 Url' type='url'
                                    onChange={(event) => onProductUrlChangeHandler(event)} />
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ mt: '20px', mb: '100px', display: 'flex', justifyContent: 'space-between' }}>
                        {/* //? 상품 등록박스4 */}
                        <Box sx={{ p: '15PX 15px', width: '235px', height: '285px', border: 0.3, borderRadius: 1 }}>
                            <Box>
                                <Card sx={{ width: '235px', height: '150px', backgroundColor: 'yellow', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' }}>
                                    <IconButton onClick={() => onProductImageUploadButtonHandler()} >
                                        <AddAPhotoIcon />
                                        <input ref={productImgRef} hidden type='file' accept='image/*' onChange={(event) => onProductImageUploadChangeHandler(event)} />
                                    </IconButton>
                                </Card>
                            </Box>
                            <Box sx={{ ml: '5px', mt: '15px' }}>
                                <Input sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 이름'
                                    onChange={(event) => onProductNameChangeHandler(event)} />
                                <Input sx={{ mt: '10px', backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 가격'
                                    onChange={(event) => onProductPriceChangeHandler(event)} />
                                <Input sx={{ mt: '10px', mr: '5px', backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 구매 Url' type='url'
                                    onChange={(event) => onProductUrlChangeHandler(event)} />
                            </Box>
                        </Box>
                        {/* //? 상품 등록박스5 */}
                        <Box sx={{ p: '15PX 15px', width: '235px', height: '285px', border: 0.3, borderRadius: 1 }}>
                            <Box>
                                <Card sx={{ width: '235px', height: '150px', backgroundColor: 'yellow', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' }}>
                                    <IconButton onClick={() => onProductImageUploadButtonHandler()} >
                                        <AddAPhotoIcon />
                                        <input ref={productImgRef} hidden type='file' accept='image/*' onChange={(event) => onProductImageUploadChangeHandler(event)} />
                                    </IconButton>
                                </Card>
                            </Box>
                            <Box sx={{ ml: '5px', mt: '15px' }}>
                                <Input sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 이름'
                                    onChange={(event) => onProductNameChangeHandler(event)} />
                                <Input sx={{ mt: '10px', backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 가격'
                                    onChange={(event) => onProductPriceChangeHandler(event)} />
                                <Input sx={{ mt: '10px', mr: '5px', backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 구매 Url' type='url'
                                    onChange={(event) => onProductUrlChangeHandler(event)} />
                            </Box>
                        </Box>
                        {/* //? 상품 등록박스6 */}
                        <Box sx={{ p: '15PX 15px', width: '235px', height: '285px', border: 0.3, borderRadius: 1 }}>
                            <Box>
                                <Card sx={{ width: '235px', height: '150px', backgroundColor: 'yellow', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' }}>
                                    <IconButton onClick={() => onProductImageUploadButtonHandler()} >
                                        <AddAPhotoIcon />
                                        <input ref={productImgRef} hidden type='file' accept='image/*' onChange={(event) => onProductImageUploadChangeHandler(event)} />
                                    </IconButton>
                                </Card>
                            </Box>
                            <Box sx={{ ml: '5px', mt: '15px' }}>
                                <Input sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 이름'
                                    onChange={(event) => onProductNameChangeHandler(event)} />
                                <Input sx={{ mt: '10px', backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 가격'
                                    onChange={(event) => onProductPriceChangeHandler(event)} />
                                <Input sx={{ mt: '10px', mr: '5px', backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '225px' }} disableUnderline placeholder='상품 구매 Url' type='url'
                                    onChange={(event) => onProductUrlChangeHandler(event)} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Fab sx={{ position: 'fixed', bottom: '150px', right: '100px' }} onClick={() => onBoardWriteHandler()}>
                <CreateIcon />
            </Fab>
        </Box>
    )

    // todo : BoardWriteView - ProductWriteView로 나누고 router에서 각각 받아오는게 나은가? // 상품 이미지 등록 박스 겹치기 어떻게 하는지 모르겠음
}
