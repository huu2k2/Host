export const formatName = (inputString) => {
  // Tách chuỗi thành các từ
  const words = inputString.split(" ");

  // Duyệt qua từng từ và chuyển đổi
  const capitalizedWords = words.map((word) => {
    // Loại bỏ ký tự số bằng cách sử dụng biểu thức chính quy
    const wordWithoutNumbers = word.replace(/\d/g, "");

    // Kiểm tra xem từ có ít nhất một ký tự không phải số
    if (/[a-zA-Z]/.test(wordWithoutNumbers)) {
      // Chuyển chữ cái đầu tiên thành chữ hoa và còn lại thành chữ thường
      const firstChar = wordWithoutNumbers[0].toUpperCase();
      const restOfWord = wordWithoutNumbers.slice(1).toLowerCase();
      return firstChar + restOfWord;
    } else {
      // Nếu từ chỉ chứa ký tự số, giữ nguyên
      return word;
    }
  });

  // Kết hợp các từ thành một chuỗi và trả về
  const result = capitalizedWords.join(" ");
  return result.replace(/\d/g, "");
};

export const formatNameHome = (inputString) => {
  return inputString.toUpperCase();
};

export const formatNumber = (inputString) => {
  var number = inputString.replace(/\D/g, "");
  return parseInt(number)===NaN ? 0 :parseInt(number);
};

export function formatPrice(price) {
  // Ensure that price is a number
  if (isNaN(price)) {
    return "";
  }

  // Convert the number to a string and ensure it's an integer
  let priceStr = String(Math.round(price));

  // Initialize the formatted price string
  let formattedPrice = "";

  // Traverse the string from right to left and add dots
  for (let i = priceStr.length - 1, count = 0; i >= 0; i--) {
    if (count === 3) {
      formattedPrice = "." + formattedPrice;
      count = 0;
    }

    // Add the current character to the formatted string
    formattedPrice = priceStr[i] + formattedPrice;
    count++;
  }

  return formattedPrice;
}

export function formatStringToPrice(chuoi) {
  // Loại bỏ dấu chấm từ chuỗi
  var chuoiKhongDauCham = chuoi.replace(/\./g, "");

  // Chuyển đổi chuỗi thành số
  var so = parseInt(chuoiKhongDauCham);

  if (isNaN(so)) {
    return null;
  }

  return so;
}
