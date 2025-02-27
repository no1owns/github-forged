import requests
from bs4 import BeautifulSoup

def fetch_amazon_product_info(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Extract product title
    title = soup.find(id='productTitle')
    if title:
        title = title.get_text().strip()
    else:
        title = 'No title found'
    
    # Extract price
    price = soup.find('span', 'a-price')
    if price:
        price = price.find('span', 'a-offscreen')
        if price:
            price = price.get_text().strip()
    else:
        price = 'No price found'

    return {'title': title, 'price': price}

if __name__ == "__main__":
    url = 'https://www.amazon.com/dp/B001BZZ43Q'  # Example product URL
    product_info = fetch_amazon_product_info(url)
    print(product_info)
