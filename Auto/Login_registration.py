import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver

# Регистрация
# driver = webdriver.Chrome(executable_path='C:/chromedriver.exe')
# driver.maximize_window()
# driver.implicitly_wait(5)
# driver.get("https://practice.automationtesting.in/")
# My_acc = driver.find_element_by_css_selector("#menu-item-50 a")
# My_acc.click()
# Email = driver.find_element_by_id("reg_email")
# Email.send_keys("twek56@gmail.com")
# time.sleep(1)
# Pass = driver.find_element_by_id("reg_password")
# Pass.send_keys("asdASDasd123!@#")
# time.sleep(1)
# Pass.click()
# Register = driver.find_element_by_name("register")
# Register.click()

# Логин
driver = webdriver.Chrome(executable_path='C:/chromedriver.exe')
driver.maximize_window()
driver.implicitly_wait(5)
driver.get("https://practice.automationtesting.in/")
My_acc = driver.find_element_by_css_selector("#menu-item-50 a")
My_acc.click()
Login = driver.find_element_by_id("username")
Login.send_keys("twek56@gmail.com")
Pass = driver.find_element_by_id("password")
Pass.send_keys("asdASDasd123!@#")
Login_btn = driver.find_element_by_name("login")
Login_btn.click()
Logout = WebDriverWait(driver, 20).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "#page-36>div>div.woocommerce>nav")))
