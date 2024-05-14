document.addEventListener('DOMContentLoaded', function() {

  var sepetListesi = document.getElementById('sepet-listesi');
  var toplamFiyat = 0; // toplamFiyat değişkenini tanımlayın ve 0 ile başlatın

  function sepetiListele() {
    sepetListesi.innerHTML = ''; // Önceki içeriği temizle
    
    var sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    console.log(sepet)
    if (sepet.length === 0) {
      sepetListesi.innerHTML = '<p>Sepetiniz boş.</p>';
    } else {
      var tablo = document.createElement('table');
      tablo.className = 'table table-striped table-dark'
      tablo.innerHTML = `
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Fiyat</th>
            <th>Miktar</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;
      var tbody = tablo.querySelector('tbody');
      toplamFiyat = 0; // Sepet listesini her güncellediğimizde toplamFiyat'ı sıfırlayın
      sepet.forEach(function(urunBilgileri) {
        var urunAdi = urunBilgileri['ad']
        var fiyat = (urunBilgileri['fiyat'])
        var miktar = urunBilgileri['miktar']
        toplamFiyat=toplamFiyat + parseInt(fiyat) * miktar
        console.log(localStorage.getItem('sepet'))

        var satir = document.createElement('tr');
        satir.innerHTML = `
          <td>${urunAdi}</td>
          <td>${fiyat}</td>
          <td>${miktar}</td>
          <td><div class="btn-group crud">
          <button class="btn btn-light btn-md mt-2 sepet" id="miktar-cikar"> - </button>
          <button class="btn btn-light btn-md mt-2 sepet" id="miktar-ekle"> + </button>
        </div></td>
        `;
        tbody.appendChild(satir);

        if (satir.querySelector('#miktar-ekle')) {
          satir.querySelector('#miktar-ekle').addEventListener('click', function() {
            arttirMiktar(urunAdi);
          });
        }
        if (satir.querySelector('#miktar-cikar')) {
          satir.querySelector('#miktar-cikar').addEventListener('click', function() {
            azaltMiktar(urunAdi);
          });
        }

      });

      sepetListesi.appendChild(tablo);
      

      ToplamUrun()
      
      sepetTutari()

      function sepetTutari(){
          toplam = document.getElementById('toplamTutar')
          toplam.textContent = 'Toplam Sepet Tutarınız : ' + toplamFiyat + ' TL'
          toplam.style.fontWeight = 'bold'
      } 

      function ToplamUrun(){
          var urunSayisi = document.getElementById('urunSayisi')
          urunSayisi.textContent = 'Toplam Urun Sayisi : ' + sepet.length
          urunSayisi.style.fontWeight = 'bold'
      } 
    }
  }

  function arttirMiktar(urunAdi) {
    var sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    for (var i = 0; i < sepet.length; i++) {
      if (sepet[i].ad === urunAdi) {
        sepet[i].miktar++;
        break; // Exit the loop after finding the product
      }
    }
    localStorage.setItem('sepet', JSON.stringify(sepet));
    sepetiListele(); // Refresh the cart display
  }
  
  function azaltMiktar(urunAdi) {
    var sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    for (var i = 0; i < sepet.length; i++) {
      if (sepet[i].ad === urunAdi) {
        sepet[i].miktar--;
        if (sepet[i].miktar === 0) {
          sepet.splice(i, 1); // Remove the product if quantity is zero
        }
        break; // Exit the loop after finding the product
      }
    }
    localStorage.setItem('sepet', JSON.stringify(sepet));
    sepetiListele(); // Refresh the cart display
  }

  // Sayfa yüklendiğinde sepeti listele
  sepetiListele()
  sepetiTemizle()

});

function sepetiTemizle(){
  const temizle = document.getElementById('temizle')

  temizle.addEventListener('click' ,() => {
  localStorage.clear()
  window.location.reload()
})
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

