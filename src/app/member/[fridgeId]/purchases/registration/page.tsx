'use client'
import Box from "@/components/ui/box";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Paragraph from "@/components/ui/paragraph";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { FaBagShopping } from "react-icons/fa6";

const PurchasesRegistrationPage =  () => {
  const { data: session } = useSession();
  const inputRef = useRef<HTMLInputElement>(null)
  // const [imageData ,setImageData] = useState();
  // const { isOpen, handleOpen } = useHandleOpen();
  // const video2Ref = useRef<HTMLVideoElement>(null);
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const captureBtnRef = useRef<HTMLButtonElement>(null);
  // const handleVideo = () => {
  //   handleOpen();
  //   const medias = {
  //     audio: false,
  //     video: {
  //         facingMode: 'environment', //メインカメラ
  //       width: { min: 370, ideal: 370, max: 370 },
  //       height: { min: 776, ideal: 776, max: 776 }
  //     }
  //   };
  //   navigator.mediaDevices
  //     .getUserMedia(medias)
  //     .then((stream) => {
  //       video2Ref.current!.srcObject = stream;
  //     })
  //     .catch((err) => console.error("カメラが許可されていません", err));
  // };
  const handleChange = async() => {
    const image = inputRef.current?.files;
    if (image) {
      const formData = new FormData();
      formData.append("image", image[0]);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fridge/${session?.user.fridgeId}/purchase/read-photo/receipt`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data);
    }

  }

  const handleClick = () => {
    inputRef.current?.click();
  };
  // const handleCapture = async () => {
  //   const context = canvasRef.current!.getContext("2d");
  //   canvasRef.current!.width = video2Ref.current!.videoWidth;
  //   canvasRef.current!.height = video2Ref.current!.videoHeight;
  //   context!.drawImage(
  //     video2Ref.current!,
  //     0,
  //     0,
  //     canvasRef.current!.width,
  //     canvasRef.current!.height
  //   );
  //   const dataURL = canvasRef.current!.toDataURL();

  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/fridge/${session?.user.fridgeId}/purchase/read-photo/receipt`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify({ dataURL: dataURL }),
  //     }
  //   );
  //   const data = await res.json();
  //   console.log(data);
  // };

  return (
    <>
      <Heading level={1} icon={FaBagShopping}>
        購入品登録
      </Heading>
      <div className="w-full flex md:gap-x-11 max-md:gap-x-2.5">
        <Box variant="rounded" className="flex-1 flex flex-col justify-between">
          <Heading level={2} className="justify-center">レシート読取</Heading>
          <ul>
            <li>
              <Label variant="check">
                <Input type="checkbox" /> 食品
              </Label>
            </li>
            <li>
              <Label variant="check">
                <Input type="checkbox" /> 日用品
              </Label>
            </li>
            <li>
              <Label variant="check">
                <Input type="checkbox" /> 非常用品
              </Label>
            </li>
          </ul>
          <div className="flex justify-center">
          <input type="file" capture="environment" accept="image/*" onChange={handleChange} ref={inputRef} className="hidden" />
            <Button variant="photo" color="primary" onClick={handleClick} />
          </div>
        </Box>
        <Box variant="rounded" className="flex-1 flex flex-col justify-between">
          <Heading level={2} className="justify-center">商品読取</Heading>
          <Paragraph>
            商品名が読み取れるように一つずつ撮影してください。
          </Paragraph>
          <div className="flex justify-center">
            <Button variant="photo" color="primary" />
          </div>
        </Box>
      </div>

{/*       
<Modal isOpen={isOpen} handleOpen={handleOpen}>
  <video ref={video2Ref} autoPlay className="w-auto h-[60%] rounded-lg bg-black"></video>
  <Button ref={captureBtnRef}  className="z-10">
        写真を撮る
      </Button>
  </Modal>
      

      <canvas ref={canvasRef} id="canvas" className="hidden"></canvas> */}
    </>
  );
}

export default PurchasesRegistrationPage;
