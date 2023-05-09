import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Box, Fab, Input, Card, IconButton, Divider } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FILE_UPLOAD_URL, mutipartHeader } from 'src/constants/api';

export default function BoardWriteView() {

    // hook //
    // const navigator = useNavigate();

    const imageRef = useRef<HTMLInputElement | null>(null);
    const productImgRef = useRef<HTMLInputElement | null>(null);
    const productRef = useRef<HTMLInputElement | null>(null); 

    // const [cookies] = useCookies();
    const [boardContent, setBoardContent] = useState<string>('');
    const [boardImgUrl, setBoardImgUrl] = useState<string>('');
    const [productImgUrl, setProductImgUrl] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [productPrice, setProductPrice] = useState<string>('');
    const [productUrl, setProductUrl] = useState<string>('');

    // event handler //
    const onBoardContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setBoardContent(value);
    } 

    const onBoardContentKeyPressHandler = (event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.key != 'Enter') return;
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
            .then((response) => BoardImageUploadResponseHandler(response))
            .catch((error) => BoardimageUploadErrorHandler(error))
    }

    const onProductImageUploadChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const data = new FormData();
        data.append('file', event.target.files[0]);
        axios.post(FILE_UPLOAD_URL, data, mutipartHeader())
            .then((response) => ProductImageUploadResponseHandler(response))
            .catch((error) => ProductImageUploadErrorHandler(error))
    }
    const onProductImageUploadButtonHandler = () => {
        if (!productImgRef.current) return;
        productImgRef.current.click();
    }

    const onProductNameChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setProductName(value);
    }

    const onProductPriceChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setProductPrice(value);
    }


    // response handler //
    const BoardImageUploadResponseHandler = (response: AxiosResponse<any, any>) => {
        const imageUrl = response.data as string;
        if (!imageUrl) return;
        setBoardImgUrl(imageUrl);
    }

    const ProductImageUploadResponseHandler = (response: AxiosResponse<any, any>) => {
        const productRef = response.data as string;
        if (!productRef) return;
        setProductImgUrl(productRef);
    }
    
    


    // error handler //
    const BoardimageUploadErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const ProductImageUploadErrorHandler = (error: any) => {
        console.log(error.message);
    }


  return (
    <Box sx={{ paddingTop: '200px' }}>
        {/* //? 게시물 본문 */}
        <Box sx={{ width: '100%'}}>
            
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx= {{  width: '300px', height: '450px', border: 0.3, borderRadius: 1, display: 'flex', justifyContent: 'center' }}>
                    <IconButton sx={{}} onClick={() => onBoardImageUploadButtonHandler()}>
                        <AddAPhotoIcon />
                        <input ref={imageRef} hidden type='file' accept='image/*' onChange={(event) => onBoardImageUploadChangeHandler(event)} />
                    </IconButton>
                </Box>                
            </Box>

            {/* //? 본문 내용 입력 */}
            <Box sx={{ display: 'block', textAlign: 'center', mt: '45px', p: '15px 0', border: 0.3, backgroundColor: 'rgba(0, 0, 0, 0.04)'}}>
                <Input sx={{ width: '800px' }} minRows={12} fullWidth multiline disableUnderline placeholder='내용을 입력하세요'
                    onChange={(event) => onBoardContentChangeHandler(event)}
                    onKeyDown={(event) => onBoardContentKeyPressHandler(event)} />
            </Box>         
        </Box>

        <Divider sx={{ m: '40px 0' }} />
        {/* //? 상품 업로드 박스 (이름이랑 구매링크만 넣는것도?) */}
        <Box sx= {{ display: 'flex', flexDirection: 'column', marginTop: '40px' }} >
            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                {/* //? 상품 등록박스1 */}
                <Box sx={{ backgroundColor: 'green', p: '15PX 15px', width: '235px', height: '285px', borderRadius: 1 }}>
                    <Box>
                        <Card sx={{ width: '235px', height: '150px',backgroundColor: 'yellow', display: 'flex', justifyContent: 'center' }}>
                            <IconButton sx={{ zIndex: '1' }} onClick={() => onProductImageUploadButtonHandler()} >
                                <AddAPhotoIcon />
                                <input ref={productImgRef} hidden type='file' accept='image/*' onChange={(event) => onProductImageUploadChangeHandler(event)} />
                            </IconButton>
                        </Card>
                    </Box>
                    <Box  sx={{ ml: '15px', mt: '15px' }}>
                        <Input placeholder='상품 이름' onChange={(event) => onProductNameChangeHandler(event)}/>
                        <Input placeholder='상품 가격' onChange={(event) => onProductPriceChangeHandler(event)}/>
                        
                    </Box>
                </Box >
                {/* //? 상품 등록박스2 */}
                <Box sx={{ backgroundColor: 'blue', p: '15PX 15px', width: '235px', height: '285px', borderRadius: 1 }}>
                    <Box>
                    <Box>
                        <Card sx={{ width: '235px', height: '150px',backgroundColor: 'yellow', display: 'flex', justifyContent: 'center' }}>
                            <IconButton sx={{ zIndex: '1' }} onClick={() => onProductImageUploadButtonHandler()} >
                                <AddAPhotoIcon />
                                <input ref={productImgRef} hidden type='file' accept='image/*' onChange={(event) => onProductImageUploadChangeHandler(event)} />
                            </IconButton>
                        </Card>
                    </Box>
                    </Box>
                    <Box  sx={{ ml: '15px', mt: '15px' }}>
                        <Input placeholder='상품 이름' onChange={(event) => onProductNameChangeHandler(event)}/>
                        <Input placeholder='상품 가격' onChange={(event) => onProductPriceChangeHandler(event)}/>
                    </Box>
                </Box>
                {/* //? 상품 등록박스3 */}
                <Box sx={{ backgroundColor: 'green', p: '15PX 15px', width: '235px', height: '285px', borderRadius: 1 }}>
                    <Box>
                        <Card sx={{ width: '235px', height: '150px',backgroundColor: 'yellow', display: 'flex', justifyContent: 'center' }}>
                            <IconButton sx={{ zIndex: '1' }} onClick={() => onProductImageUploadButtonHandler()} >
                                <AddAPhotoIcon />
                                <input ref={productImgRef} hidden type='file' accept='image/*' onChange={(event) => onProductImageUploadChangeHandler(event)} />
                            </IconButton>
                        </Card>
                    </Box>
                    <Box  sx={{ ml: '15px', mt: '15px' }}>
                        <Input placeholder='상품 이름' onChange={(event) => onProductNameChangeHandler(event)}/>
                        <Input placeholder='상품 가격' onChange={(event) => onProductPriceChangeHandler(event)}/>
                    </Box>                        
                </Box>
            </Box>

            <Box sx={{ mt: '20px', mb: '100px' ,display: 'flex', justifyContent: 'space-between'}}>
                {/* //? 상품 등록박스4 */}
                <Box sx={{ backgroundColor: 'green', p: '15PX 15px', width: '235px', height: '285px', borderRadius: 1 }}>
                <Box>
                        <Card sx={{ width: '235px', height: '150px',backgroundColor: 'yellow', display: 'flex', justifyContent: 'center' }}>
                            <IconButton sx={{ zIndex: '1' }} onClick={() => onProductImageUploadButtonHandler()} >
                                <AddAPhotoIcon />
                                <input ref={productImgRef} hidden type='file' accept='image/*' onChange={(event) => onProductImageUploadChangeHandler(event)} />
                            </IconButton>
                        </Card>
                    </Box>
                    <Box  sx={{ ml: '15px', mt: '15px' }}>
                        <Input placeholder='상품 이름' onChange={(event) => onProductNameChangeHandler(event)}/>
                        <Input placeholder='상품 가격' onChange={(event) => onProductPriceChangeHandler(event)}/>
                    </Box>
                </Box>
                {/* //? 상품 등록박스5 */}
                <Box sx={{ backgroundColor: 'green', p: '15PX 15px', width: '235px', height: '285px', borderRadius: 1 }}>
                <Box>
                        <Card sx={{ width: '235px', height: '150px',backgroundColor: 'yellow', display: 'flex', justifyContent: 'center' }}>
                            <IconButton sx={{ zIndex: '1' }} onClick={() => onProductImageUploadButtonHandler()} >
                                <AddAPhotoIcon />
                                <input ref={productImgRef} hidden type='file' accept='image/*' onChange={(event) => onProductImageUploadChangeHandler(event)} />
                            </IconButton>
                        </Card>
                    </Box>
                    <Box  sx={{ ml: '15px', mt: '15px' }}>
                        <Input placeholder='상품 이름' onChange={(event) => onProductNameChangeHandler(event)}/>
                        <Input placeholder='상품 가격' onChange={(event) => onProductPriceChangeHandler(event)}/>
                    </Box>
                </Box>
                {/* //? 상품 등록박스6 */}
                <Box sx={{ backgroundColor: 'green', p: '15PX 15px', width: '235px', height: '285px', borderRadius: 1 }}>
                <Box>
                        <Card sx={{ width: '235px', height: '150px',backgroundColor: 'yellow', display: 'flex', justifyContent: 'center' }}>
                            <IconButton sx={{ zIndex: '1' }} onClick={() => onProductImageUploadButtonHandler()} >
                                <AddAPhotoIcon />
                                <input ref={productImgRef} hidden type='file' accept='image/*' onChange={(event) => onProductImageUploadChangeHandler(event)} />
                            </IconButton>
                        </Card>
                    </Box>
                    <Box  sx={{ ml: '15px', mt: '15px' }}>
                        <Input placeholder='상품 이름' onChange={(event) => onProductNameChangeHandler(event)}/>
                        <Input placeholder='상품 가격' onChange={(event) => onProductPriceChangeHandler(event)}/>
                    </Box>
                </Box>
            </Box>
        </Box>

        <Fab sx={{ position: 'fixed', bottom: '150px', right: '250px' }}>
            <CreateIcon />
        </Fab>
    </Box>
  )
}
