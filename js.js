
const getDate = new Date()
const getYear = getDate.getFullYear()
const getMount = getDate.getMonth() + 1
const getDay = getDate.getDate()

function bulan() {
    if (getMount < 10) {
        bulan = `0${getMount}`;
    } else {
        bulan = getMount
    }
    return bulan

}

function hari() {
    if (getDay < 10) {
        hari = `0${getDay}`
    } else {
        hari = getDay
    }
    return hari
}


const tanggal = `${getYear}/${bulan()}/${hari()}`


//mengambil nama kota yang tersimpan di local storage
const tampilKota = document.querySelector('.judul-kota')
tampilKota.innerHTML = localStorage.judulKota


function getJadwalSholat() {
    fetch('https://api.myquran.com/v1/sholat/jadwal/'+localStorage.idKota+'/' + tanggal)
        .then(response => response.json())
        .then(datas => {
            const jadwal = datas.data.jadwal;
            // console.log(jadwal);
            document.querySelector('.imsak').textContent = jadwal.imsak;
            document.querySelector('.subuh').textContent = jadwal.subuh;
            document.querySelector('.terbit').textContent = jadwal.terbit;
            document.querySelector('.dzuhur').textContent = jadwal.dzuhur;
            document.querySelector('.ashar').textContent = jadwal.ashar;
            document.querySelector('.maghrib').textContent = jadwal.maghrib;
            document.querySelector('.isya').textContent = jadwal.isya;
            document.querySelector('.tanggal').textContent = jadwal.tanggal;
        })
}


//lokasi

const inputSearch = document.querySelector('.input-search');
const cardList = document.querySelector('.card-list')

inputSearch.addEventListener('keyup', function () {
    const valueSearch = inputSearch.value.length;

    if (valueSearch > 0) {
        cardList.classList.remove('hidden-list')
        fetch('https://api.myquran.com/v1/sholat/kota/semua')
            .then(response => response.json())
            // .then(response => console.log(response))
            .then(response => {
                const kota = response
                let listKota = ''
                kota.forEach(k => {
                    listKota += `<a href="#" id="nama-kota" data-idkota="${k.id}" class="list-group-item list-group-item-action">${k.lokasi}</a>`
                })
                const namaKota = document.querySelector('.card-list')
                namaKota.innerHTML = listKota;

                //ketika nama kota dipilih
                const isiKota = document.querySelectorAll("#nama-kota")
                isiKota.forEach(kota => {

                    //hanya memunculkan nama kota sesuai inputan
                    const filterText = inputSearch.value.toLowerCase();
                    const itemText  = kota.firstChild.textContent.toLowerCase();

                    if(itemText.indexOf(filterText) != -1){
                        kota.setAttribute("style", "display: block")
                    } else{
                        kota.setAttribute("style", "display: none !important")
                    }

                    kota.addEventListener('click', function () {
                        const idKota = this.dataset.idkota
                        const judulKota = this.textContent

                        //menyimpan data id dan nama kota di localStorage
                        window.localStorage.setItem('idKota', idKota)
                        window.localStorage.setItem('judulKota', judulKota)

                        //menghilangkan list kota ketika sudah dipilih
                        namaKota.classList.add('hidden-list')
                        inputSearch.value = ''
                        location.reload();
                        alert(`kota ${judulKota} berhasil dipilih`)
                        
                        

                    })
                })
                
            })


    } else {
        cardList.classList.add('hidden-list')
    }
})

getJadwalSholat();