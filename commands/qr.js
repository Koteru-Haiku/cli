import qrcode from 'qrcode';
import readline from 'readline';

async function generateQRCode(text) {
  try {
    await qrcode.toFile('qrcode.png', text);
    console.log('Mã QR đã được tạo và lưu tại qrcode.png');
  } catch (error) {
    console.error('Lỗi khi tạo mã QR:', error);
  }
}

export function qrCommand() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Xác nhận tạo mã qr? (Y/N): ', (action) => {
    if (action === 'Y') {
      rl.question('Nhập văn bản hoặc URL bạn muốn tạo mã QR: ', (text) => {
        generateQRCode(text);
        rl.close();
      });
    } else if (action === 'N') {
      console.log('Quá trình tạo mã QR đã bị hủy.');
      rl.close();
    } else {
      console.log('Lựa chọn không hợp lệ');
      rl.close();
    }
  });
}
