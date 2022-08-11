import { FC } from "react";
import styled from "styled-components";
import { Upload } from "antd";

import { COLORS } from "@variables";
import Button from "components/atoms/Button";

const { twitterBlue } = COLORS;

interface IImageUploadButton {
  imageFile: any;
  setImageFile: (file: any) => void;
}

const ImageUploadButton: FC<IImageUploadButton> = ({
  setImageFile,
  imageFile,
}) => {
  const beforeUpload = () => {
    return false;
  };

  return (
    <ImageUploadButtonContainer>
      <Upload
        showUploadList={false}
        onChange={setImageFile}
        beforeUpload={beforeUpload}
        fileList={imageFile ? [imageFile] : []}
      >
        <Button
          className='upload-btn pill'
          icon={{ icon: "image", size: 16, color: twitterBlue }}
        />
      </Upload>
    </ImageUploadButtonContainer>
  );
};

export default ImageUploadButton;

const ImageUploadButtonContainer = styled.div``;
