document.addEventListener('DOMContentLoaded', function () {
  var sepetButonlari = document.querySelectorAll('.sepet');

  function butonAyari() {
    for (var i = 0; i < sepetButonlari.length; i++) {
      var buton = sepetButonlari[i];

      // En büyük butonun genişliğini al
      var enBuyukGenislik = Math.max.apply(null, Array.from(sepetButonlari, function (buton) {
        return buton.offsetWidth;
      }));

      // Tüm butonlara en büyük genişliği ata
      buton.style.width = 30 + 'px';
      buton.style.textAlign = 'center'
    }
  }

  butonAyari()

})
document.addEventListener('DOMContentLoaded', function () {

  function intro() {
    setTimeout(function () {
      document.getElementById("main-content").style.display = "block";
      document.querySelector(".loading-screen").style.opacity = "0"; // Opacity değerini yavaşça 0'a indirir
      setTimeout(function () {
        document.querySelector(".loading-screen").style.display = "none"; // Ekranı kaldırır
      }, 1000); // Opacity animasyonunun tamamlanması için bir saniye bekler
    }, 2000);
  }
  intro()
  var sepetEkleButonlari = document.querySelectorAll('.sepet-ekle');
  var sepetCikarButonlari = document.querySelectorAll('.sepet-cikar');
  var saatTarihDiv = document.getElementById('saatTarih');
  function sepeteEkle() {
    for (var i = 0; i < sepetEkleButonlari.length; i++) {
      sepetEkleButonlari[i].addEventListener('click', function () {
        var urunAdi = this.parentElement.parentElement.querySelector('.card-title').textContent;
        var urunFiyati = (this.parentElement.parentElement.querySelector('.card-text').textContent).substring(7) // Fiyatı metinden çıkarıp float türüne çevir

        // Sepete ekleme işlemi
        var sepet = JSON.parse(localStorage.getItem('sepet')) || [];
        var urun = {
          ad: urunAdi,
          fiyat: urunFiyati,
          miktar: 1
        };
        sepet.push(urun);
        localStorage.setItem('sepet', JSON.stringify(sepet));

        bildirimGoster();

        console.log(urunAdi + ' sepete eklendi.');
      });
    }
  }

  sepeteEkle()
  sepettenCikar()
  showExcRate()


  function sepettenCikar() {
    for (var j = 0; j < sepetCikarButonlari.length; j++) {
      sepetCikarButonlari[j].addEventListener('click', function () {
        var urunAdi = this.parentElement.parentElement.querySelector('.card-title').textContent;

        // Sepetten çıkarma işlemi
        var sepet = JSON.parse(localStorage.getItem('sepet')) || [];
        var index = sepet.indexOf(urunAdi);
        if (index !== -1) {
          sepet.splice(index, 1);
          localStorage.setItem('sepet', JSON.stringify(sepet));
          console.log(urunAdi + ' sepetten çıkarıldı.');
        }
      });
    }
  }

  function bildirimGoster() {
    bildirim.innerText = 'Ürününüz sepete eklendi';
    bildirim.style.display = 'block'; // Bildirimi göster

    setTimeout(function () {
      bildirim.style.display = 'none'; // 3 saniye sonra bildirimi gizle
    }, 3000);
  }

  function saatTarihGuncelle() {
    var simdikiZaman = new Date();
    var saat = simdikiZaman.getHours().toString().padStart(2, '0'); // Saati alırken başına 0 ekleyerek iki haneli olmasını sağlıyoruz
    var dakika = simdikiZaman.getMinutes().toString().padStart(2, '0'); // Dakikayı alırken başına 0 ekleyerek iki haneli olmasını sağlıyoruz
    var saniye = simdikiZaman.getSeconds().toString().padStart(2, '0'); // Saniyeyi alırken başına 0 ekleyerek iki haneli olmasını sağlıyoruz
    var tarih = simdikiZaman.toLocaleDateString('tr-TR'); // Türkiye formatına göre tarih alıyoruz

    var saatTarihMetni = saat + ':' + dakika + ':' + saniye + ' | ' + tarih;
    saatTarihDiv.textContent = saatTarihMetni;
  }

  function showExcRate() {
    var apiUrl = "https://v6.exchangerate-api.com/v6/30895642f7d57d0419f1dd99/latest/USD"

    // API'den dolar kuru verilerini almak için fetch kullanımı

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // API'den gelen verileri alın
        var dolarKuru = data.conversion_rates['TRY']; // TRY kuru alınabilir
        // Dolar kurunu HTML içine yerleştir
        document.getElementById('dolar-kur').textContent = '|  Dolar Kuru: ' + (dolarKuru).toFixed(3) + ' TL/$';
      })
      .catch(error => {
        // Hata durumunda kullanıcıya bilgi ver
        console.error('Bir hata oluştu:', error);
      })
  }

  const apiKey = "99e5229a0d0a6b694d28ef2dee84a545"

  // Kullanıcının konumunu alın
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather);
  } else {
    document.getElementById("havaDurumu").innerHTML = "Tarayıcınız coğrafi konumu desteklemiyor.";
  }

  function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // OpenWeatherMap API'sinden hava durumunu alın
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=tr`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Hava durumu bilgilerini alın
        const city = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        // Hava durumu bilgilerini HTML'e yazdırın
        document.getElementById("havaDurumu").innerHTML = `
            <p><strong>${city}</strong></p>
            <p>${temperature}°C, ${description}</p>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
          `;
      })
      .catch(error => {
        console.error("Hava durumu alınamadı:", error);
        document.getElementById("havaDurumu").innerHTML = "Hava durumu alınamadı.";
      });
  }

  function changeFont() {
    var elements = document.querySelectorAll('*');

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].tagName == 'I') {
        continue
      }
      elements[i].style.fontFamily = 'Big Shoulders Display , sans-serif';
      elements[i].style.fontSize = '20px'
      if (elements[i].tagName == 'H1') {
        elements[i].style.fontSize = '40px'
      }
      if (elements[i].tagName == 'H5') {
        elements[i].style.fontSize = '25px'
      }
    }
  }

  changeFont()

  // Her saniyede bir saat ve tarihi güncelle
  setInterval(saatTarihGuncelle, 1000);

  // Sayfa yüklendiğinde ilk kez saat ve tarihi güncelle
  saatTarihGuncelle();
});