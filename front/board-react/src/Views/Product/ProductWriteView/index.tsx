import { ChangeEvent, useRef, useState } from 'react'
import axios, { AxiosResponse } from 'axios';

import { Box, Card, Fab, IconButton, Input } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CreateIcon from '@mui/icons-material/Create';

import { FILE_UPLOAD_URL, POST_PRODUCT_URL, authorizationHeader, mutipartHeader } from 'src/constants/api';
import { useCookies } from 'react-cookie';
import { PostProductDto } from 'src/apis/request/board';
import ResponseDto from 'src/apis/response';
import { PostProductResponseDto } from 'src/apis/response/board';

// todo : boardwriteView에서 합쳐서 잘 돌아가면 필요없음

export default function ProductWriteView() {
  //     hook      //
  // const navigator = useNavigate();

  const productImgRef = useRef<HTMLInputElement | null>(null);

  const [cookies] = useCookies();
  const [productImgUrl, setProductImgUrl] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [productUrl, setProductUrl] = useState<string>('');

  const accessToken = cookies.accessToken;

  // event handler //
  const onProductImageUploadButtonHandler = () => {
    if (!productImgRef.current) return;
    productImgRef.current.click();
  }
  const onProductImageUploadChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const data = new FormData();
    data.append('file', event.target.files[0]);

    axios.post(FILE_UPLOAD_URL, data, mutipartHeader())
      .then((response) => productImageUploadResponseHandler(response))
      .catch((error) => productImageUploadErrorHandler(error))
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

  const postProduct = () => {
    const data: PostProductDto = { productName, productImgUrl, productPrice, productUrl }

    axios.post(POST_PRODUCT_URL, data, authorizationHeader(accessToken))
      .then((response) => postProductResponseHandler(response))
      .catch((error) => postProductErrorHandler(error))
  }

  const onProductWriteHandler = () => {
    if (!productImgUrl.trim() || !productName.trim() || !productPrice.trim() || !productUrl.trim()) {
      alert('모든 내용을 작성해주세요!');
      return;
    }
  }

  // response handler //
  const productImageUploadResponseHandler = (response: AxiosResponse<any, any>) => {
    const productImgUrl = response.data as string;
    if (!productImgUrl) return;
    setProductImgUrl(productImgUrl);
  }

  const postProductResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<PostProductResponseDto>
    if (!result || !data) {
      alert(message);
      return;
    }
  }

  // error handler //
  const productImageUploadErrorHandler = (error: any) => {
    console.log(error.message);
  }

  const postProductErrorHandler = (error: any) => {
    console.log(error.message);
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: '100px', pl: '450px', width: '1000px' }}>
      {/* //? 상품 업로드 박스 */}
      <Box >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* //? 상품 등록박스1 */}
          <Box sx={{ p: '15PX 15px', width: '235px', height: '285px', border: 0.3, borderRadius: 1 }}>
            <Box sx={{ display: 'flex' }}>
            <Box sx= {{ p: '15px 0' }}>
                <Box sx={{ width: '100%'}} >
                    <Box sx={{ width: '100%' }} component='img' src={productImgUrl} />
                </Box>
            </Box>  


              <Box sx={{ zIndex: '2px' }}>
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

      <Fab sx={{ position: 'fixed', bottom: '150px', right: '100px' }} onClick={() => onProductWriteHandler()}>
        <CreateIcon />
      </Fab>


    </Box>
  )
}
