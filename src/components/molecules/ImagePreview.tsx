import { FC, memo, useEffect, useState } from "react";
import styled from "styled-components";

import { getBase64 } from "utils/getBase64";
import Button from "components/atoms/Button";

interface IImagePreview {
  imageFile: any;
  onClearImage: () => void;
}

const ImagePreview: FC<IImagePreview> = ({ imageFile, onClearImage }) => {
  const { fileList } = imageFile;
  const [imagePreview, setImagePreview] = useState("");

  const convertToBase64 = async () => {
    fileList[0].preview = await getBase64(fileList[0].originFileObj);
    setImagePreview(fileList[0].preview);
  };

  useEffect(() => {
    convertToBase64();
  }, [fileList]);

  return (
    <ImagePreviewContainer>
      <Button
        className='delete-btn'
        icon={{ icon: "clear", size: 20 }}
        onClick={onClearImage}
      />
      <img src={imagePreview} alt='image upload' />
    </ImagePreviewContainer>
  );
};

export default memo(ImagePreview);

const ImagePreviewContainer = styled.div`
  img {
    display: block;
    max-width: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
