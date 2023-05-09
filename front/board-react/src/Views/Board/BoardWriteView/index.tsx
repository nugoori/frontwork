import React from 'react'
import { Box, Fab, Input, Card, IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export default function BoardWriteView() {
  return (
<Box sx={{ paddingTop: '200px' }}>
    {/* //? 게시물 본문 */}
    <Box sx={{ width: '100%' }}>
        {/* //? 본문 내용 입력 */}
        <Box sx={{ display: 'block', textAlign: 'center'}}>
            
            <Input sx={{  }} fullWidth multiline placeholder='내용을 입력하세요' />
        </Box>
        <IconButton sx={{ textAlign: 'end'}}>
            <AddAPhotoIcon />
        </IconButton>          
    </Box>
    
    {/* //? 상품 업로드 박스 (이름이랑 구매링크만 넣는것도?) */}
    <Box sx= {{ display: 'flex', flexDirection: 'column', marginTop: '40px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
            {/* //? 상품 등록박스1 */}
            <Box sx={{ backgroundColor: 'green', width: '300px', height: '300px' }}>
                <Box>
                    <IconButton>
                        <AddAPhotoIcon />
                    </IconButton>
                </Box>
            <Input placeholder='상품 이름' />
            <Input placeholder='상품 가격' />
            </Box >
            {/* //? 상품 등록박스2 */}
            <Box sx={{ backgroundColor: 'blue', width: '300px', height: '300px' }}>

            </Box>
            {/* //? 상품 등록박스3 */}
            <Box sx={{ backgroundColor: 'green', width: '300px', height: '300px' }}>

            </Box>
        </Box>

        <Box sx={{ mt: '20px' ,display: 'flex', justifyContent: 'space-between'}}>
            {/* //? 상품 등록박스4 */}
            <Box sx={{ backgroundColor: 'green', width: '300px', height: '300px' }}>

            </Box>
            {/* //? 상품 등록박스5 */}
            <Box sx={{ backgroundColor: 'green', width: '300px', height: '300px' }}>

            </Box>
            {/* //? 상품 등록박스6 */}
            <Box sx={{ backgroundColor: 'green', width: '300px', height: '300px' }}>

            </Box>
        </Box>
    </Box>

    <Fab>
        <CreateIcon />
    </Fab>

</Box>
  )
}
