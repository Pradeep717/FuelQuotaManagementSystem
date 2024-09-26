// Qr code generator helper function
import QRCode from "qrcode";

export const generateQrCode = async (text) => {
  try {
    const qrCode = await QRCode.toDataURL(text);
    return qrCode;
  } catch (error) {
    console.log("Error in generateQrCode: ", error.message);
  }
};

export default generateQrCode;
