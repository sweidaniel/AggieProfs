const axios = require('axios');

module.exports = async (req, res) => {
  const { dept, number } = req.query;

  if (!dept || !number) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  let data = `dept=${dept}&number=${number}`;

  let config = {
    method: 'post',
    url: 'https://anex.us/grades/getData/',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 
      'host': 'anex.us', 
      'connection': 'keep-alive', 
      'content-length': '20', 
      'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"', 
      'dnt': '1', 
      'sec-ch-ua-mobile': '?0', 
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', 
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 
      'accept': '*/*', 
      'x-requested-with': 'XMLHttpRequest', 
      'sec-ch-ua-platform': '"macOS"', 
      'origin': 'https://anex.us', 
      'sec-fetch-site': 'same-origin', 
      'sec-fetch-mode': 'cors', 
      'sec-fetch-dest': 'empty', 
      'referer': 'https://anex.us/grades/?dept=CSCE&number=314', 
      'accept-encoding': 'gzip, deflate, br', 
      'accept-language': 'en-US,en;q=0.9', 
      'cookie': '_ga=GA1.1.1157899119.1700972165; _ga_7Q5LMJ4SNL=GS1.1.1701731103.11.1.1701734039.0.0.0', 
      'dept': 'BIOL', 
      'number': '102', 
      'gradedistributions': 'https://anex.us/grades/getData/', 
      'x-postman-captr': '1444397'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    const dataWithNumbers = response.data.classes.map(cls => {
      const classWithNumbers = {};
      for (const [key, value] of Object.entries(cls)) {
        classWithNumbers[key] = isNaN(Number(value)) ? value : Number(value);
      }
      return classWithNumbers;
    });

    res.status(200).json({ ...response.data, classes: dataWithNumbers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
