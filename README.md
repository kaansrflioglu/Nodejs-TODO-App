
# Nodejs TODO Uygulaması
Bu proje, Node.js, EJS ve JSON-Server kullanılarak geliştirilmiş basit bir To-Do Listesi uygulamasıdır. Kullanıcılar, görev ekleyip silebilir ve görevlerini güncelleyebilir. EJS sayesinde sayfalar dinamik olarak oluşturulur. Veriler, JSON-Server ile db.json dosyasında saklanarak bir REST API gibi kullanılmaktadır. Backend sunucusnun çalıştırdığınız konsolda çıkan adrese giderek uygulamanıza aynı ağda bulunan tüm cihazlardan katılabilirsiniz.

## Projede Kullanılan Teknolojiler
* Node.js
* JSON-Server
* EJS
* Bootstrap 5
* JavaScript

## Uygulama Hakkında
Bu uygulama, kullanıcıların yapılacaklar listesi oluşturmasını ve tamamlanma durumunu yönetmesini sağlar. Kullanıcı dostu arayüz ve güçlü bir backend ile görevlerin takibini kolaylaştırır.

## Özellikler:
* Yeni görev eklenebilir.
* Bir görevin tamamlanma durumu değiştirilebilir, içeriği düzenlenebilir ve silinebilir.

## Kurulumu ve Kullanımı

**Gereksinimler**
Sisteminizde Node.js kurulu olmalıdır.  
`node -v`  

Projeyi derlemek ve bağımlılıkları yönetmek için Node Package Manager (NPM) gereklidir.  
`npm -v`  

Veritabanı olarak JSON-Server kullanılır. `utils` klasörü içerisinde `db.json` dosyasının bulunduğundan emin olun.

**Kurulum**  
**1-** Proje dizinine gidin:  
`cd /path/to/your/Nodejs-TODO-App`  

**2-** NPM ile proje gereksinimlerini indirin:  
`npm install`  

**3-** JSON-Server'i çalıştırın:  
`npm run json-server`

**4-** Sunucuyu çalıştırın:  
`npm start`