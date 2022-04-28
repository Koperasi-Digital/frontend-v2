const cities = [
  {
    city_id: '1',
    city_name: 'Aceh Barat',
    postal_code: '23681'
  },
  {
    city_id: '2',
    city_name: 'Aceh Barat Daya',
    postal_code: '23764'
  },
  {
    city_id: '3',
    city_name: 'Aceh Besar',
    postal_code: '23951'
  },
  {
    city_id: '4',
    city_name: 'Aceh Jaya',
    postal_code: '23654'
  },
  {
    city_id: '5',
    city_name: 'Aceh Selatan',
    postal_code: '23719'
  },
  {
    city_id: '6',
    city_name: 'Aceh Singkil',
    postal_code: '24785'
  },
  {
    city_id: '7',
    city_name: 'Aceh Tamiang',
    postal_code: '24476'
  },
  {
    city_id: '8',
    city_name: 'Aceh Tengah',
    postal_code: '24511'
  },
  {
    city_id: '9',
    city_name: 'Aceh Tenggara',
    postal_code: '24611'
  },
  {
    city_id: '10',
    city_name: 'Aceh Timur',
    postal_code: '24454'
  },
  {
    city_id: '11',
    city_name: 'Aceh Utara',
    postal_code: '24382'
  },
  {
    city_id: '12',
    city_name: 'Agam',
    postal_code: '26411'
  },
  {
    city_id: '13',
    city_name: 'Alor',
    postal_code: '85811'
  },
  {
    city_id: '14',
    city_name: 'Ambon',
    postal_code: '97222'
  },
  {
    city_id: '15',
    city_name: 'Asahan',
    postal_code: '21214'
  },
  {
    city_id: '16',
    city_name: 'Asmat',
    postal_code: '99777'
  },
  {
    city_id: '17',
    city_name: 'Badung',
    postal_code: '80351'
  },
  {
    city_id: '18',
    city_name: 'Balangan',
    postal_code: '71611'
  },
  {
    city_id: '19',
    city_name: 'Balikpapan',
    postal_code: '76111'
  },
  {
    city_id: '20',
    city_name: 'Banda Aceh',
    postal_code: '23238'
  },
  {
    city_id: '21',
    city_name: 'Bandar Lampung',
    postal_code: '35139'
  },
  {
    city_id: '22',
    city_name: 'Kabupaten Bandung',
    postal_code: '40311'
  },
  {
    city_id: '23',
    city_name: 'Bandung',
    postal_code: '40111'
  },
  {
    city_id: '24',
    city_name: 'Bandung Barat',
    postal_code: '40721'
  },
  {
    city_id: '25',
    city_name: 'Banggai',
    postal_code: '94711'
  },
  {
    city_id: '26',
    city_name: 'Banggai Kepulauan',
    postal_code: '94881'
  },
  {
    city_id: '27',
    city_name: 'Bangka',
    postal_code: '33212'
  },
  {
    city_id: '28',
    city_name: 'Bangka Barat',
    postal_code: '33315'
  },
  {
    city_id: '29',
    city_name: 'Bangka Selatan',
    postal_code: '33719'
  },
  {
    city_id: '30',
    city_name: 'Bangka Tengah',
    postal_code: '33613'
  },
  {
    city_id: '31',
    city_name: 'Bangkalan',
    postal_code: '69118'
  },
  {
    city_id: '32',
    city_name: 'Bangli',
    postal_code: '80619'
  },
  {
    city_id: '33',
    city_name: 'Banjar',
    postal_code: '70619'
  },
  {
    city_id: '34',
    city_name: 'Banjar',
    postal_code: '46311'
  },
  {
    city_id: '35',
    city_name: 'Banjarbaru',
    postal_code: '70712'
  },
  {
    city_id: '36',
    city_name: 'Banjarmasin',
    postal_code: '70117'
  },
  {
    city_id: '37',
    city_name: 'Banjarnegara',
    postal_code: '53419'
  },
  {
    city_id: '38',
    city_name: 'Bantaeng',
    postal_code: '92411'
  },
  {
    city_id: '39',
    city_name: 'Bantul',
    postal_code: '55715'
  },
  {
    city_id: '40',
    city_name: 'Banyuasin',
    postal_code: '30911'
  },
  {
    city_id: '41',
    city_name: 'Banyumas',
    postal_code: '53114'
  },
  {
    city_id: '42',
    city_name: 'Banyuwangi',
    postal_code: '68416'
  },
  {
    city_id: '43',
    city_name: 'Barito Kuala',
    postal_code: '70511'
  },
  {
    city_id: '44',
    city_name: 'Barito Selatan',
    postal_code: '73711'
  },
  {
    city_id: '45',
    city_name: 'Barito Timur',
    postal_code: '73671'
  },
  {
    city_id: '46',
    city_name: 'Barito Utara',
    postal_code: '73881'
  },
  {
    city_id: '47',
    city_name: 'Barru',
    postal_code: '90719'
  },
  {
    city_id: '48',
    city_name: 'Batam',
    postal_code: '29413'
  },
  {
    city_id: '49',
    city_name: 'Batang',
    postal_code: '51211'
  },
  {
    city_id: '50',
    city_name: 'Batang Hari',
    postal_code: '36613'
  },
  {
    city_id: '51',
    city_name: 'Batu',
    postal_code: '65311'
  },
  {
    city_id: '52',
    city_name: 'Batu Bara',
    postal_code: '21655'
  },
  {
    city_id: '53',
    city_name: 'Bau-Bau',
    postal_code: '93719'
  },
  {
    city_id: '54',
    city_name: 'Kabupaten Bekasi',
    postal_code: '17837'
  },
  {
    city_id: '55',
    city_name: 'Bekasi',
    postal_code: '17121'
  },
  {
    city_id: '56',
    city_name: 'Belitung',
    postal_code: '33419'
  },
  {
    city_id: '57',
    city_name: 'Belitung Timur',
    postal_code: '33519'
  },
  {
    city_id: '58',
    city_name: 'Belu',
    postal_code: '85711'
  },
  {
    city_id: '59',
    city_name: 'Bener Meriah',
    postal_code: '24581'
  },
  {
    city_id: '60',
    city_name: 'Bengkalis',
    postal_code: '28719'
  },
  {
    city_id: '61',
    city_name: 'Bengkayang',
    postal_code: '79213'
  },
  {
    city_id: '62',
    city_name: 'Bengkulu',
    postal_code: '38229'
  },
  {
    city_id: '63',
    city_name: 'Bengkulu Selatan',
    postal_code: '38519'
  },
  {
    city_id: '64',
    city_name: 'Bengkulu Tengah',
    postal_code: '38319'
  },
  {
    city_id: '65',
    city_name: 'Bengkulu Utara',
    postal_code: '38619'
  },
  {
    city_id: '66',
    city_name: 'Berau',
    postal_code: '77311'
  },
  {
    city_id: '67',
    city_name: 'Biak Numfor',
    postal_code: '98119'
  },
  {
    city_id: '68',
    city_name: 'Bima',
    postal_code: '84171'
  },
  {
    city_id: '69',
    city_name: 'Bima',
    postal_code: '84139'
  },
  {
    city_id: '70',
    city_name: 'Binjai',
    postal_code: '20712'
  },
  {
    city_id: '71',
    city_name: 'Bintan',
    postal_code: '29135'
  },
  {
    city_id: '72',
    city_name: 'Bireuen',
    postal_code: '24219'
  },
  {
    city_id: '73',
    city_name: 'Bitung',
    postal_code: '95512'
  },
  {
    city_id: '74',
    city_name: 'Blitar',
    postal_code: '66171'
  },
  {
    city_id: '75',
    city_name: 'Blitar',
    postal_code: '66124'
  },
  {
    city_id: '76',
    city_name: 'Blora',
    postal_code: '58219'
  },
  {
    city_id: '77',
    city_name: 'Boalemo',
    postal_code: '96319'
  },
  {
    city_id: '78',
    city_name: 'Bogor',
    postal_code: '16911'
  },
  {
    city_id: '79',
    city_name: 'Bogor',
    postal_code: '16119'
  },
  {
    city_id: '80',
    city_name: 'Bojonegoro',
    postal_code: '62119'
  },
  {
    city_id: '81',
    city_name: 'Bolaang Mongondow (Bolmong)',
    postal_code: '95755'
  },
  {
    city_id: '82',
    city_name: 'Bolaang Mongondow Selatan',
    postal_code: '95774'
  },
  {
    city_id: '83',
    city_name: 'Bolaang Mongondow Timur',
    postal_code: '95783'
  },
  {
    city_id: '84',
    city_name: 'Bolaang Mongondow Utara',
    postal_code: '95765'
  },
  {
    city_id: '85',
    city_name: 'Bombana',
    postal_code: '93771'
  },
  {
    city_id: '86',
    city_name: 'Bondowoso',
    postal_code: '68219'
  },
  {
    city_id: '87',
    city_name: 'Bone',
    postal_code: '92713'
  },
  {
    city_id: '88',
    city_name: 'Bone Bolango',
    postal_code: '96511'
  },
  {
    city_id: '89',
    city_name: 'Bontang',
    postal_code: '75313'
  },
  {
    city_id: '90',
    city_name: 'Boven Digoel',
    postal_code: '99662'
  },
  {
    city_id: '91',
    city_name: 'Boyolali',
    postal_code: '57312'
  },
  {
    city_id: '92',
    city_name: 'Brebes',
    postal_code: '52212'
  },
  {
    city_id: '93',
    city_name: 'Bukittinggi',
    postal_code: '26115'
  },
  {
    city_id: '94',
    city_name: 'Buleleng',
    postal_code: '81111'
  },
  {
    city_id: '95',
    city_name: 'Bulukumba',
    postal_code: '92511'
  },
  {
    city_id: '96',
    city_name: 'Bulungan (Bulongan)',
    postal_code: '77211'
  },
  {
    city_id: '97',
    city_name: 'Bungo',
    postal_code: '37216'
  },
  {
    city_id: '98',
    city_name: 'Buol',
    postal_code: '94564'
  },
  {
    city_id: '99',
    city_name: 'Buru',
    postal_code: '97371'
  },
  {
    city_id: '100',
    city_name: 'Buru Selatan',
    postal_code: '97351'
  },
  {
    city_id: '101',
    city_name: 'Buton',
    postal_code: '93754'
  },
  {
    city_id: '102',
    city_name: 'Buton Utara',
    postal_code: '93745'
  },
  {
    city_id: '103',
    city_name: 'Ciamis',
    postal_code: '46211'
  },
  {
    city_id: '104',
    city_name: 'Cianjur',
    postal_code: '43217'
  },
  {
    city_id: '105',
    city_name: 'Cilacap',
    postal_code: '53211'
  },
  {
    city_id: '106',
    city_name: 'Cilegon',
    postal_code: '42417'
  },
  {
    city_id: '107',
    city_name: 'Cimahi',
    postal_code: '40512'
  },
  {
    city_id: '108',
    city_name: 'Cirebon',
    postal_code: '45611'
  },
  {
    city_id: '109',
    city_name: 'Cirebon',
    postal_code: '45116'
  },
  {
    city_id: '110',
    city_name: 'Dairi',
    postal_code: '22211'
  },
  {
    city_id: '111',
    city_name: 'Deiyai (Deliyai)',
    postal_code: '98784'
  },
  {
    city_id: '112',
    city_name: 'Deli Serdang',
    postal_code: '20511'
  },
  {
    city_id: '113',
    city_name: 'Demak',
    postal_code: '59519'
  },
  {
    city_id: '114',
    city_name: 'Denpasar',
    postal_code: '80227'
  },
  {
    city_id: '115',
    city_name: 'Depok',
    postal_code: '16416'
  },
  {
    city_id: '116',
    city_name: 'Dharmasraya',
    postal_code: '27612'
  },
  {
    city_id: '117',
    city_name: 'Dogiyai',
    postal_code: '98866'
  },
  {
    city_id: '118',
    city_name: 'Dompu',
    postal_code: '84217'
  },
  {
    city_id: '119',
    city_name: 'Donggala',
    postal_code: '94341'
  },
  {
    city_id: '120',
    city_name: 'Dumai',
    postal_code: '28811'
  },
  {
    city_id: '121',
    city_name: 'Empat Lawang',
    postal_code: '31811'
  },
  {
    city_id: '122',
    city_name: 'Ende',
    postal_code: '86351'
  },
  {
    city_id: '123',
    city_name: 'Enrekang',
    postal_code: '91719'
  },
  {
    city_id: '124',
    city_name: 'Fakfak',
    postal_code: '98651'
  },
  {
    city_id: '125',
    city_name: 'Flores Timur',
    postal_code: '86213'
  },
  {
    city_id: '126',
    city_name: 'Garut',
    postal_code: '44126'
  },
  {
    city_id: '127',
    city_name: 'Gayo Lues',
    postal_code: '24653'
  },
  {
    city_id: '128',
    city_name: 'Gianyar',
    postal_code: '80519'
  },
  {
    city_id: '129',
    city_name: 'Gorontalo',
    postal_code: '96218'
  },
  {
    city_id: '130',
    city_name: 'Gorontalo',
    postal_code: '96115'
  },
  {
    city_id: '131',
    city_name: 'Gorontalo Utara',
    postal_code: '96611'
  },
  {
    city_id: '132',
    city_name: 'Gowa',
    postal_code: '92111'
  },
  {
    city_id: '133',
    city_name: 'Gresik',
    postal_code: '61115'
  },
  {
    city_id: '134',
    city_name: 'Grobogan',
    postal_code: '58111'
  },
  {
    city_id: '135',
    city_name: 'Gunung Kidul',
    postal_code: '55812'
  },
  {
    city_id: '136',
    city_name: 'Gunung Mas',
    postal_code: '74511'
  },
  {
    city_id: '137',
    city_name: 'Gunungsitoli',
    postal_code: '22813'
  },
  {
    city_id: '138',
    city_name: 'Halmahera Barat',
    postal_code: '97757'
  },
  {
    city_id: '139',
    city_name: 'Halmahera Selatan',
    postal_code: '97911'
  },
  {
    city_id: '140',
    city_name: 'Halmahera Tengah',
    postal_code: '97853'
  },
  {
    city_id: '141',
    city_name: 'Halmahera Timur',
    postal_code: '97862'
  },
  {
    city_id: '142',
    city_name: 'Halmahera Utara',
    postal_code: '97762'
  },
  {
    city_id: '143',
    city_name: 'Hulu Sungai Selatan',
    postal_code: '71212'
  },
  {
    city_id: '144',
    city_name: 'Hulu Sungai Tengah',
    postal_code: '71313'
  },
  {
    city_id: '145',
    city_name: 'Hulu Sungai Utara',
    postal_code: '71419'
  },
  {
    city_id: '146',
    city_name: 'Humbang Hasundutan',
    postal_code: '22457'
  },
  {
    city_id: '147',
    city_name: 'Indragiri Hilir',
    postal_code: '29212'
  },
  {
    city_id: '148',
    city_name: 'Indragiri Hulu',
    postal_code: '29319'
  },
  {
    city_id: '149',
    city_name: 'Indramayu',
    postal_code: '45214'
  },
  {
    city_id: '150',
    city_name: 'Intan Jaya',
    postal_code: '98771'
  },
  {
    city_id: '151',
    city_name: 'Jakarta Barat',
    postal_code: '11220'
  },
  {
    city_id: '152',
    city_name: 'Jakarta Pusat',
    postal_code: '10540'
  },
  {
    city_id: '153',
    city_name: 'Jakarta Selatan',
    postal_code: '12230'
  },
  {
    city_id: '154',
    city_name: 'Jakarta Timur',
    postal_code: '13330'
  },
  {
    city_id: '155',
    city_name: 'Jakarta Utara',
    postal_code: '14140'
  },
  {
    city_id: '156',
    city_name: 'Jambi',
    postal_code: '36111'
  },
  {
    city_id: '157',
    city_name: 'Jayapura',
    postal_code: '99352'
  },
  {
    city_id: '158',
    city_name: 'Jayapura',
    postal_code: '99114'
  },
  {
    city_id: '159',
    city_name: 'Jayawijaya',
    postal_code: '99511'
  },
  {
    city_id: '160',
    city_name: 'Jember',
    postal_code: '68113'
  },
  {
    city_id: '161',
    city_name: 'Jembrana',
    postal_code: '82251'
  },
  {
    city_id: '162',
    city_name: 'Jeneponto',
    postal_code: '92319'
  },
  {
    city_id: '163',
    city_name: 'Jepara',
    postal_code: '59419'
  },
  {
    city_id: '164',
    city_name: 'Jombang',
    postal_code: '61415'
  },
  {
    city_id: '165',
    city_name: 'Kaimana',
    postal_code: '98671'
  },
  {
    city_id: '166',
    city_name: 'Kampar',
    postal_code: '28411'
  },
  {
    city_id: '167',
    city_name: 'Kapuas',
    postal_code: '73583'
  },
  {
    city_id: '168',
    city_name: 'Kapuas Hulu',
    postal_code: '78719'
  },
  {
    city_id: '169',
    city_name: 'Karanganyar',
    postal_code: '57718'
  },
  {
    city_id: '170',
    city_name: 'Karangasem',
    postal_code: '80819'
  },
  {
    city_id: '171',
    city_name: 'Karawang',
    postal_code: '41311'
  },
  {
    city_id: '172',
    city_name: 'Karimun',
    postal_code: '29611'
  },
  {
    city_id: '173',
    city_name: 'Karo',
    postal_code: '22119'
  },
  {
    city_id: '174',
    city_name: 'Katingan',
    postal_code: '74411'
  },
  {
    city_id: '175',
    city_name: 'Kaur',
    postal_code: '38911'
  },
  {
    city_id: '176',
    city_name: 'Kayong Utara',
    postal_code: '78852'
  },
  {
    city_id: '177',
    city_name: 'Kebumen',
    postal_code: '54319'
  },
  {
    city_id: '178',
    city_name: 'Kediri',
    postal_code: '64184'
  },
  {
    city_id: '179',
    city_name: 'Kediri',
    postal_code: '64125'
  },
  {
    city_id: '180',
    city_name: 'Keerom',
    postal_code: '99461'
  },
  {
    city_id: '181',
    city_name: 'Kendal',
    postal_code: '51314'
  },
  {
    city_id: '182',
    city_name: 'Kendari',
    postal_code: '93126'
  },
  {
    city_id: '183',
    city_name: 'Kepahiang',
    postal_code: '39319'
  },
  {
    city_id: '184',
    city_name: 'Kepulauan Anambas',
    postal_code: '29991'
  },
  {
    city_id: '185',
    city_name: 'Kepulauan Aru',
    postal_code: '97681'
  },
  {
    city_id: '186',
    city_name: 'Kepulauan Mentawai',
    postal_code: '25771'
  },
  {
    city_id: '187',
    city_name: 'Kepulauan Meranti',
    postal_code: '28791'
  },
  {
    city_id: '188',
    city_name: 'Kepulauan Sangihe',
    postal_code: '95819'
  },
  {
    city_id: '189',
    city_name: 'Kepulauan Seribu',
    postal_code: '14550'
  },
  {
    city_id: '190',
    city_name: 'Kepulauan Siau Tagulandang Biaro (Sitaro)',
    postal_code: '95862'
  },
  {
    city_id: '191',
    city_name: 'Kepulauan Sula',
    postal_code: '97995'
  },
  {
    city_id: '192',
    city_name: 'Kepulauan Talaud',
    postal_code: '95885'
  },
  {
    city_id: '193',
    city_name: 'Kepulauan Yapen (Yapen Waropen)',
    postal_code: '98211'
  },
  {
    city_id: '194',
    city_name: 'Kerinci',
    postal_code: '37167'
  },
  {
    city_id: '195',
    city_name: 'Ketapang',
    postal_code: '78874'
  },
  {
    city_id: '196',
    city_name: 'Klaten',
    postal_code: '57411'
  },
  {
    city_id: '197',
    city_name: 'Klungkung',
    postal_code: '80719'
  },
  {
    city_id: '198',
    city_name: 'Kolaka',
    postal_code: '93511'
  },
  {
    city_id: '199',
    city_name: 'Kolaka Utara',
    postal_code: '93911'
  },
  {
    city_id: '200',
    city_name: 'Konawe',
    postal_code: '93411'
  },
  {
    city_id: '201',
    city_name: 'Konawe Selatan',
    postal_code: '93811'
  },
  {
    city_id: '202',
    city_name: 'Konawe Utara',
    postal_code: '93311'
  },
  {
    city_id: '203',
    city_name: 'Kotabaru',
    postal_code: '72119'
  },
  {
    city_id: '204',
    city_name: 'Kotamobagu',
    postal_code: '95711'
  },
  {
    city_id: '205',
    city_name: 'Kotawaringin Barat',
    postal_code: '74119'
  },
  {
    city_id: '206',
    city_name: 'Kotawaringin Timur',
    postal_code: '74364'
  },
  {
    city_id: '207',
    city_name: 'Kuantan Singingi',
    postal_code: '29519'
  },
  {
    city_id: '208',
    city_name: 'Kubu Raya',
    postal_code: '78311'
  },
  {
    city_id: '209',
    city_name: 'Kudus',
    postal_code: '59311'
  },
  {
    city_id: '210',
    city_name: 'Kulon Progo',
    postal_code: '55611'
  },
  {
    city_id: '211',
    city_name: 'Kuningan',
    postal_code: '45511'
  },
  {
    city_id: '212',
    city_name: 'Kupang',
    postal_code: '85362'
  },
  {
    city_id: '213',
    city_name: 'Kupang',
    postal_code: '85119'
  },
  {
    city_id: '214',
    city_name: 'Kutai Barat',
    postal_code: '75711'
  },
  {
    city_id: '215',
    city_name: 'Kutai Kartanegara',
    postal_code: '75511'
  },
  {
    city_id: '216',
    city_name: 'Kutai Timur',
    postal_code: '75611'
  },
  {
    city_id: '217',
    city_name: 'Labuhan Batu',
    postal_code: '21412'
  },
  {
    city_id: '218',
    city_name: 'Labuhan Batu Selatan',
    postal_code: '21511'
  },
  {
    city_id: '219',
    city_name: 'Labuhan Batu Utara',
    postal_code: '21711'
  },
  {
    city_id: '220',
    city_name: 'Lahat',
    postal_code: '31419'
  },
  {
    city_id: '221',
    city_name: 'Lamandau',
    postal_code: '74611'
  },
  {
    city_id: '222',
    city_name: 'Lamongan',
    postal_code: '64125'
  },
  {
    city_id: '223',
    city_name: 'Lampung Barat',
    postal_code: '34814'
  },
  {
    city_id: '224',
    city_name: 'Lampung Selatan',
    postal_code: '35511'
  },
  {
    city_id: '225',
    city_name: 'Lampung Tengah',
    postal_code: '34212'
  },
  {
    city_id: '226',
    city_name: 'Lampung Timur',
    postal_code: '34319'
  },
  {
    city_id: '227',
    city_name: 'Lampung Utara',
    postal_code: '34516'
  },
  {
    city_id: '228',
    city_name: 'Landak',
    postal_code: '78319'
  },
  {
    city_id: '229',
    city_name: 'Langkat',
    postal_code: '20811'
  },
  {
    city_id: '230',
    city_name: 'Langsa',
    postal_code: '24412'
  },
  {
    city_id: '231',
    city_name: 'Lanny Jaya',
    postal_code: '99531'
  },
  {
    city_id: '232',
    city_name: 'Lebak',
    postal_code: '42319'
  },
  {
    city_id: '233',
    city_name: 'Lebong',
    postal_code: '39264'
  },
  {
    city_id: '234',
    city_name: 'Lembata',
    postal_code: '86611'
  },
  {
    city_id: '235',
    city_name: 'Lhokseumawe',
    postal_code: '24352'
  },
  {
    city_id: '236',
    city_name: 'Lima Puluh Koto/Kota',
    postal_code: '26671'
  },
  {
    city_id: '237',
    city_name: 'Lingga',
    postal_code: '29811'
  },
  {
    city_id: '238',
    city_name: 'Lombok Barat',
    postal_code: '83311'
  },
  {
    city_id: '239',
    city_name: 'Lombok Tengah',
    postal_code: '83511'
  },
  {
    city_id: '240',
    city_name: 'Lombok Timur',
    postal_code: '83612'
  },
  {
    city_id: '241',
    city_name: 'Lombok Utara',
    postal_code: '83711'
  },
  {
    city_id: '242',
    city_name: 'Lubuk Linggau',
    postal_code: '31614'
  },
  {
    city_id: '243',
    city_name: 'Lumajang',
    postal_code: '67319'
  },
  {
    city_id: '244',
    city_name: 'Luwu',
    postal_code: '91994'
  },
  {
    city_id: '245',
    city_name: 'Luwu Timur',
    postal_code: '92981'
  },
  {
    city_id: '246',
    city_name: 'Luwu Utara',
    postal_code: '92911'
  },
  {
    city_id: '247',
    city_name: 'Kabupaten Madiun',
    postal_code: '63153'
  },
  {
    city_id: '248',
    city_name: 'Madiun',
    postal_code: '63122'
  },
  {
    city_id: '249',
    city_name: 'Magelang',
    postal_code: '56519'
  },
  {
    city_id: '250',
    city_name: 'Magelang',
    postal_code: '56133'
  },
  {
    city_id: '251',
    city_name: 'Magetan',
    postal_code: '63314'
  },
  {
    city_id: '252',
    city_name: 'Majalengka',
    postal_code: '45412'
  },
  {
    city_id: '253',
    city_name: 'Majene',
    postal_code: '91411'
  },
  {
    city_id: '254',
    city_name: 'Makassar',
    postal_code: '90111'
  },
  {
    city_id: '255',
    city_name: 'Malang',
    postal_code: '65163'
  },
  {
    city_id: '256',
    city_name: 'Malang',
    postal_code: '65112'
  },
  {
    city_id: '257',
    city_name: 'Malinau',
    postal_code: '77511'
  },
  {
    city_id: '258',
    city_name: 'Maluku Barat Daya',
    postal_code: '97451'
  },
  {
    city_id: '259',
    city_name: 'Maluku Tengah',
    postal_code: '97513'
  },
  {
    city_id: '260',
    city_name: 'Maluku Tenggara',
    postal_code: '97651'
  },
  {
    city_id: '261',
    city_name: 'Maluku Tenggara Barat',
    postal_code: '97465'
  },
  {
    city_id: '262',
    city_name: 'Mamasa',
    postal_code: '91362'
  },
  {
    city_id: '263',
    city_name: 'Mamberamo Raya',
    postal_code: '99381'
  },
  {
    city_id: '264',
    city_name: 'Mamberamo Tengah',
    postal_code: '99553'
  },
  {
    city_id: '265',
    city_name: 'Mamuju',
    postal_code: '91519'
  },
  {
    city_id: '266',
    city_name: 'Mamuju Utara',
    postal_code: '91571'
  },
  {
    city_id: '267',
    city_name: 'Manado',
    postal_code: '95247'
  },
  {
    city_id: '268',
    city_name: 'Mandailing Natal',
    postal_code: '22916'
  },
  {
    city_id: '269',
    city_name: 'Manggarai',
    postal_code: '86551'
  },
  {
    city_id: '270',
    city_name: 'Manggarai Barat',
    postal_code: '86711'
  },
  {
    city_id: '271',
    city_name: 'Manggarai Timur',
    postal_code: '86811'
  },
  {
    city_id: '272',
    city_name: 'Manokwari',
    postal_code: '98311'
  },
  {
    city_id: '273',
    city_name: 'Manokwari Selatan',
    postal_code: '98355'
  },
  {
    city_id: '274',
    city_name: 'Mappi',
    postal_code: '99853'
  },
  {
    city_id: '275',
    city_name: 'Maros',
    postal_code: '90511'
  },
  {
    city_id: '276',
    city_name: 'Mataram',
    postal_code: '83131'
  },
  {
    city_id: '277',
    city_name: 'Maybrat',
    postal_code: '98051'
  },
  {
    city_id: '278',
    city_name: 'Medan',
    postal_code: '20228'
  },
  {
    city_id: '279',
    city_name: 'Melawi',
    postal_code: '78619'
  },
  {
    city_id: '280',
    city_name: 'Merangin',
    postal_code: '37319'
  },
  {
    city_id: '281',
    city_name: 'Merauke',
    postal_code: '99613'
  },
  {
    city_id: '282',
    city_name: 'Mesuji',
    postal_code: '34911'
  },
  {
    city_id: '283',
    city_name: 'Metro',
    postal_code: '34111'
  },
  {
    city_id: '284',
    city_name: 'Mimika',
    postal_code: '99962'
  },
  {
    city_id: '285',
    city_name: 'Minahasa',
    postal_code: '95614'
  },
  {
    city_id: '286',
    city_name: 'Minahasa Selatan',
    postal_code: '95914'
  },
  {
    city_id: '287',
    city_name: 'Minahasa Tenggara',
    postal_code: '95995'
  },
  {
    city_id: '288',
    city_name: 'Minahasa Utara',
    postal_code: '95316'
  },
  {
    city_id: '289',
    city_name: 'Mojokerto',
    postal_code: '61382'
  },
  {
    city_id: '290',
    city_name: 'Mojokerto',
    postal_code: '61316'
  },
  {
    city_id: '291',
    city_name: 'Morowali',
    postal_code: '94911'
  },
  {
    city_id: '292',
    city_name: 'Muara Enim',
    postal_code: '31315'
  },
  {
    city_id: '293',
    city_name: 'Muaro Jambi',
    postal_code: '36311'
  },
  {
    city_id: '294',
    city_name: 'Muko Muko',
    postal_code: '38715'
  },
  {
    city_id: '295',
    city_name: 'Muna',
    postal_code: '93611'
  },
  {
    city_id: '296',
    city_name: 'Murung Raya',
    postal_code: '73911'
  },
  {
    city_id: '297',
    city_name: 'Musi Banyuasin',
    postal_code: '30719'
  },
  {
    city_id: '298',
    city_name: 'Musi Rawas',
    postal_code: '31661'
  },
  {
    city_id: '299',
    city_name: 'Nabire',
    postal_code: '98816'
  },
  {
    city_id: '300',
    city_name: 'Nagan Raya',
    postal_code: '23674'
  },
  {
    city_id: '301',
    city_name: 'Nagekeo',
    postal_code: '86911'
  },
  {
    city_id: '302',
    city_name: 'Natuna',
    postal_code: '29711'
  },
  {
    city_id: '303',
    city_name: 'Nduga',
    postal_code: '99541'
  },
  {
    city_id: '304',
    city_name: 'Ngada',
    postal_code: '86413'
  },
  {
    city_id: '305',
    city_name: 'Nganjuk',
    postal_code: '64414'
  },
  {
    city_id: '306',
    city_name: 'Ngawi',
    postal_code: '63219'
  },
  {
    city_id: '307',
    city_name: 'Nias',
    postal_code: '22876'
  },
  {
    city_id: '308',
    city_name: 'Nias Barat',
    postal_code: '22895'
  },
  {
    city_id: '309',
    city_name: 'Nias Selatan',
    postal_code: '22865'
  },
  {
    city_id: '310',
    city_name: 'Nias Utara',
    postal_code: '22856'
  },
  {
    city_id: '311',
    city_name: 'Nunukan',
    postal_code: '77421'
  },
  {
    city_id: '312',
    city_name: 'Ogan Ilir',
    postal_code: '30811'
  },
  {
    city_id: '313',
    city_name: 'Ogan Komering Ilir',
    postal_code: '30618'
  },
  {
    city_id: '314',
    city_name: 'Ogan Komering Ulu',
    postal_code: '32112'
  },
  {
    city_id: '315',
    city_name: 'Ogan Komering Ulu Selatan',
    postal_code: '32211'
  },
  {
    city_id: '316',
    city_name: 'Ogan Komering Ulu Timur',
    postal_code: '32312'
  },
  {
    city_id: '317',
    city_name: 'Pacitan',
    postal_code: '63512'
  },
  {
    city_id: '318',
    city_name: 'Padang',
    postal_code: '25112'
  },
  {
    city_id: '319',
    city_name: 'Padang Lawas',
    postal_code: '22763'
  },
  {
    city_id: '320',
    city_name: 'Padang Lawas Utara',
    postal_code: '22753'
  },
  {
    city_id: '321',
    city_name: 'Padang Panjang',
    postal_code: '27122'
  },
  {
    city_id: '322',
    city_name: 'Padang Pariaman',
    postal_code: '25583'
  },
  {
    city_id: '323',
    city_name: 'Padang Sidempuan',
    postal_code: '22727'
  },
  {
    city_id: '324',
    city_name: 'Pagar Alam',
    postal_code: '31512'
  },
  {
    city_id: '325',
    city_name: 'Pakpak Bharat',
    postal_code: '22272'
  },
  {
    city_id: '326',
    city_name: 'Palangka Raya',
    postal_code: '73112'
  },
  {
    city_id: '327',
    city_name: 'Palembang',
    postal_code: '30111'
  },
  {
    city_id: '328',
    city_name: 'Palopo',
    postal_code: '91911'
  },
  {
    city_id: '329',
    city_name: 'Palu',
    postal_code: '94111'
  },
  {
    city_id: '330',
    city_name: 'Pamekasan',
    postal_code: '69319'
  },
  {
    city_id: '331',
    city_name: 'Pandeglang',
    postal_code: '42212'
  },
  {
    city_id: '332',
    city_name: 'Pangandaran',
    postal_code: '46511'
  },
  {
    city_id: '333',
    city_name: 'Pangkajene Kepulauan',
    postal_code: '90611'
  },
  {
    city_id: '334',
    city_name: 'Pangkal Pinang',
    postal_code: '33115'
  },
  {
    city_id: '335',
    city_name: 'Paniai',
    postal_code: '98765'
  },
  {
    city_id: '336',
    city_name: 'Parepare',
    postal_code: '91123'
  },
  {
    city_id: '337',
    city_name: 'Pariaman',
    postal_code: '25511'
  },
  {
    city_id: '338',
    city_name: 'Parigi Moutong',
    postal_code: '94411'
  },
  {
    city_id: '339',
    city_name: 'Pasaman',
    postal_code: '26318'
  },
  {
    city_id: '340',
    city_name: 'Pasaman Barat',
    postal_code: '26511'
  },
  {
    city_id: '341',
    city_name: 'Paser',
    postal_code: '76211'
  },
  {
    city_id: '342',
    city_name: 'Pasuruan',
    postal_code: '67153'
  },
  {
    city_id: '343',
    city_name: 'Pasuruan',
    postal_code: '67118'
  },
  {
    city_id: '344',
    city_name: 'Pati',
    postal_code: '59114'
  },
  {
    city_id: '345',
    city_name: 'Payakumbuh',
    postal_code: '26213'
  },
  {
    city_id: '346',
    city_name: 'Pegunungan Arfak',
    postal_code: '98354'
  },
  {
    city_id: '347',
    city_name: 'Pegunungan Bintang',
    postal_code: '99573'
  },
  {
    city_id: '348',
    city_name: 'Pekalongan',
    postal_code: '51161'
  },
  {
    city_id: '349',
    city_name: 'Pekalongan',
    postal_code: '51122'
  },
  {
    city_id: '350',
    city_name: 'Pekanbaru',
    postal_code: '28112'
  },
  {
    city_id: '351',
    city_name: 'Pelalawan',
    postal_code: '28311'
  },
  {
    city_id: '352',
    city_name: 'Pemalang',
    postal_code: '52319'
  },
  {
    city_id: '353',
    city_name: 'Pematang Siantar',
    postal_code: '21126'
  },
  {
    city_id: '354',
    city_name: 'Penajam Paser Utara',
    postal_code: '76311'
  },
  {
    city_id: '355',
    city_name: 'Pesawaran',
    postal_code: '35312'
  },
  {
    city_id: '356',
    city_name: 'Pesisir Barat',
    postal_code: '35974'
  },
  {
    city_id: '357',
    city_name: 'Pesisir Selatan',
    postal_code: '25611'
  },
  {
    city_id: '358',
    city_name: 'Pidie',
    postal_code: '24116'
  },
  {
    city_id: '359',
    city_name: 'Pidie Jaya',
    postal_code: '24186'
  },
  {
    city_id: '360',
    city_name: 'Pinrang',
    postal_code: '91251'
  },
  {
    city_id: '361',
    city_name: 'Pohuwato',
    postal_code: '96419'
  },
  {
    city_id: '362',
    city_name: 'Polewali Mandar',
    postal_code: '91311'
  },
  {
    city_id: '363',
    city_name: 'Ponorogo',
    postal_code: '63411'
  },
  {
    city_id: '364',
    city_name: 'Pontianak',
    postal_code: '78971'
  },
  {
    city_id: '365',
    city_name: 'Pontianak',
    postal_code: '78112'
  },
  {
    city_id: '366',
    city_name: 'Poso',
    postal_code: '94615'
  },
  {
    city_id: '367',
    city_name: 'Prabumulih',
    postal_code: '31121'
  },
  {
    city_id: '368',
    city_name: 'Pringsewu',
    postal_code: '35719'
  },
  {
    city_id: '369',
    city_name: 'Probolinggo',
    postal_code: '67282'
  },
  {
    city_id: '370',
    city_name: 'Probolinggo',
    postal_code: '67215'
  },
  {
    city_id: '371',
    city_name: 'Pulang Pisau',
    postal_code: '74811'
  },
  {
    city_id: '372',
    city_name: 'Pulau Morotai',
    postal_code: '97771'
  },
  {
    city_id: '373',
    city_name: 'Puncak',
    postal_code: '98981'
  },
  {
    city_id: '374',
    city_name: 'Puncak Jaya',
    postal_code: '98979'
  },
  {
    city_id: '375',
    city_name: 'Purbalingga',
    postal_code: '53312'
  },
  {
    city_id: '376',
    city_name: 'Purwakarta',
    postal_code: '41119'
  },
  {
    city_id: '377',
    city_name: 'Purworejo',
    postal_code: '54111'
  },
  {
    city_id: '378',
    city_name: 'Raja Ampat',
    postal_code: '98489'
  },
  {
    city_id: '379',
    city_name: 'Rejang Lebong',
    postal_code: '39112'
  },
  {
    city_id: '380',
    city_name: 'Rembang',
    postal_code: '59219'
  },
  {
    city_id: '381',
    city_name: 'Rokan Hilir',
    postal_code: '28992'
  },
  {
    city_id: '382',
    city_name: 'Rokan Hulu',
    postal_code: '28511'
  },
  {
    city_id: '383',
    city_name: 'Rote Ndao',
    postal_code: '85982'
  },
  {
    city_id: '384',
    city_name: 'Sabang',
    postal_code: '23512'
  },
  {
    city_id: '385',
    city_name: 'Sabu Raijua',
    postal_code: '85391'
  },
  {
    city_id: '386',
    city_name: 'Salatiga',
    postal_code: '50711'
  },
  {
    city_id: '387',
    city_name: 'Samarinda',
    postal_code: '75133'
  },
  {
    city_id: '388',
    city_name: 'Sambas',
    postal_code: '79453'
  },
  {
    city_id: '389',
    city_name: 'Samosir',
    postal_code: '22392'
  },
  {
    city_id: '390',
    city_name: 'Sampang',
    postal_code: '69219'
  },
  {
    city_id: '391',
    city_name: 'Sanggau',
    postal_code: '78557'
  },
  {
    city_id: '392',
    city_name: 'Sarmi',
    postal_code: '99373'
  },
  {
    city_id: '393',
    city_name: 'Sarolangun',
    postal_code: '37419'
  },
  {
    city_id: '394',
    city_name: 'Sawah Lunto',
    postal_code: '27416'
  },
  {
    city_id: '395',
    city_name: 'Sekadau',
    postal_code: '79583'
  },
  {
    city_id: '396',
    city_name: 'Selayar (Kepulauan Selayar)',
    postal_code: '92812'
  },
  {
    city_id: '397',
    city_name: 'Seluma',
    postal_code: '38811'
  },
  {
    city_id: '398',
    city_name: 'Semarang',
    postal_code: '50511'
  },
  {
    city_id: '399',
    city_name: 'Semarang',
    postal_code: '50135'
  },
  {
    city_id: '400',
    city_name: 'Seram Bagian Barat',
    postal_code: '97561'
  },
  {
    city_id: '401',
    city_name: 'Seram Bagian Timur',
    postal_code: '97581'
  },
  {
    city_id: '402',
    city_name: 'Serang',
    postal_code: '42182'
  },
  {
    city_id: '403',
    city_name: 'Serang',
    postal_code: '42111'
  },
  {
    city_id: '404',
    city_name: 'Serdang Bedagai',
    postal_code: '20915'
  },
  {
    city_id: '405',
    city_name: 'Seruyan',
    postal_code: '74211'
  },
  {
    city_id: '406',
    city_name: 'Siak',
    postal_code: '28623'
  },
  {
    city_id: '407',
    city_name: 'Sibolga',
    postal_code: '22522'
  },
  {
    city_id: '408',
    city_name: 'Sidenreng Rappang/Rapang',
    postal_code: '91613'
  },
  {
    city_id: '409',
    city_name: 'Sidoarjo',
    postal_code: '61219'
  },
  {
    city_id: '410',
    city_name: 'Sigi',
    postal_code: '94364'
  },
  {
    city_id: '411',
    city_name: 'Sijunjung (Sawah Lunto Sijunjung)',
    postal_code: '27511'
  },
  {
    city_id: '412',
    city_name: 'Sikka',
    postal_code: '86121'
  },
  {
    city_id: '413',
    city_name: 'Simalungun',
    postal_code: '21162'
  },
  {
    city_id: '414',
    city_name: 'Simeulue',
    postal_code: '23891'
  },
  {
    city_id: '415',
    city_name: 'Singkawang',
    postal_code: '79117'
  },
  {
    city_id: '416',
    city_name: 'Sinjai',
    postal_code: '92615'
  },
  {
    city_id: '417',
    city_name: 'Sintang',
    postal_code: '78619'
  },
  {
    city_id: '418',
    city_name: 'Situbondo',
    postal_code: '68316'
  },
  {
    city_id: '419',
    city_name: 'Sleman',
    postal_code: '55513'
  },
  {
    city_id: '420',
    city_name: 'Kabupaten Solok',
    postal_code: '27365'
  },
  {
    city_id: '421',
    city_name: 'Solok',
    postal_code: '27315'
  },
  {
    city_id: '422',
    city_name: 'Solok Selatan',
    postal_code: '27779'
  },
  {
    city_id: '423',
    city_name: 'Soppeng',
    postal_code: '90812'
  },
  {
    city_id: '424',
    city_name: 'Sorong',
    postal_code: '98431'
  },
  {
    city_id: '425',
    city_name: 'Sorong',
    postal_code: '98411'
  },
  {
    city_id: '426',
    city_name: 'Sorong Selatan',
    postal_code: '98454'
  },
  {
    city_id: '427',
    city_name: 'Sragen',
    postal_code: '57211'
  },
  {
    city_id: '428',
    city_name: 'Subang',
    postal_code: '41215'
  },
  {
    city_id: '429',
    city_name: 'Subulussalam',
    postal_code: '24882'
  },
  {
    city_id: '430',
    city_name: 'Sukabumi',
    postal_code: '43311'
  },
  {
    city_id: '431',
    city_name: 'Sukabumi',
    postal_code: '43114'
  },
  {
    city_id: '432',
    city_name: 'Sukamara',
    postal_code: '74712'
  },
  {
    city_id: '433',
    city_name: 'Sukoharjo',
    postal_code: '57514'
  },
  {
    city_id: '434',
    city_name: 'Sumba Barat',
    postal_code: '87219'
  },
  {
    city_id: '435',
    city_name: 'Sumba Barat Daya',
    postal_code: '87453'
  },
  {
    city_id: '436',
    city_name: 'Sumba Tengah',
    postal_code: '87358'
  },
  {
    city_id: '437',
    city_name: 'Sumba Timur',
    postal_code: '87112'
  },
  {
    city_id: '438',
    city_name: 'Sumbawa',
    postal_code: '84315'
  },
  {
    city_id: '439',
    city_name: 'Sumbawa Barat',
    postal_code: '84419'
  },
  {
    city_id: '440',
    city_name: 'Sumedang',
    postal_code: '45326'
  },
  {
    city_id: '441',
    city_name: 'Sumenep',
    postal_code: '69413'
  },
  {
    city_id: '442',
    city_name: 'Sungaipenuh',
    postal_code: '37113'
  },
  {
    city_id: '443',
    city_name: 'Supiori',
    postal_code: '98164'
  },
  {
    city_id: '444',
    city_name: 'Surabaya',
    postal_code: '60119'
  },
  {
    city_id: '445',
    city_name: 'Surakarta (Solo)',
    postal_code: '57113'
  },
  {
    city_id: '446',
    city_name: 'Tabalong',
    postal_code: '71513'
  },
  {
    city_id: '447',
    city_name: 'Tabanan',
    postal_code: '82119'
  },
  {
    city_id: '448',
    city_name: 'Takalar',
    postal_code: '92212'
  },
  {
    city_id: '449',
    city_name: 'Tambrauw',
    postal_code: '98475'
  },
  {
    city_id: '450',
    city_name: 'Tana Tidung',
    postal_code: '77611'
  },
  {
    city_id: '451',
    city_name: 'Tana Toraja',
    postal_code: '91819'
  },
  {
    city_id: '452',
    city_name: 'Tanah Bumbu',
    postal_code: '72211'
  },
  {
    city_id: '453',
    city_name: 'Tanah Datar',
    postal_code: '27211'
  },
  {
    city_id: '454',
    city_name: 'Tanah Laut',
    postal_code: '70811'
  },
  {
    city_id: '455',
    city_name: 'Tangerang',
    postal_code: '15914'
  },
  {
    city_id: '456',
    city_name: 'Tangerang',
    postal_code: '15111'
  },
  {
    city_id: '457',
    city_name: 'Tangerang Selatan',
    postal_code: '15435'
  },
  {
    city_id: '458',
    city_name: 'Tanggamus',
    postal_code: '35619'
  },
  {
    city_id: '459',
    city_name: 'Tanjung Balai',
    postal_code: '21321'
  },
  {
    city_id: '460',
    city_name: 'Tanjung Jabung Barat',
    postal_code: '36513'
  },
  {
    city_id: '461',
    city_name: 'Tanjung Jabung Timur',
    postal_code: '36719'
  },
  {
    city_id: '462',
    city_name: 'Tanjung Pinang',
    postal_code: '29111'
  },
  {
    city_id: '463',
    city_name: 'Tapanuli Selatan',
    postal_code: '22742'
  },
  {
    city_id: '464',
    city_name: 'Tapanuli Tengah',
    postal_code: '22611'
  },
  {
    city_id: '465',
    city_name: 'Tapanuli Utara',
    postal_code: '22414'
  },
  {
    city_id: '466',
    city_name: 'Tapin',
    postal_code: '71119'
  },
  {
    city_id: '467',
    city_name: 'Tarakan',
    postal_code: '77114'
  },
  {
    city_id: '468',
    city_name: 'Tasikmalaya',
    postal_code: '46411'
  },
  {
    city_id: '469',
    city_name: 'Tasikmalaya',
    postal_code: '46116'
  },
  {
    city_id: '470',
    city_name: 'Tebing Tinggi',
    postal_code: '20632'
  },
  {
    city_id: '471',
    city_name: 'Tebo',
    postal_code: '37519'
  },
  {
    city_id: '472',
    city_name: 'Tegal',
    postal_code: '52419'
  },
  {
    city_id: '473',
    city_name: 'Tegal',
    postal_code: '52114'
  },
  {
    city_id: '474',
    city_name: 'Teluk Bintuni',
    postal_code: '98551'
  },
  {
    city_id: '475',
    city_name: 'Teluk Wondama',
    postal_code: '98591'
  },
  {
    city_id: '476',
    city_name: 'Temanggung',
    postal_code: '56212'
  },
  {
    city_id: '477',
    city_name: 'Ternate',
    postal_code: '97714'
  },
  {
    city_id: '478',
    city_name: 'Tidore Kepulauan',
    postal_code: '97815'
  },
  {
    city_id: '479',
    city_name: 'Timor Tengah Selatan',
    postal_code: '85562'
  },
  {
    city_id: '480',
    city_name: 'Timor Tengah Utara',
    postal_code: '85612'
  },
  {
    city_id: '481',
    city_name: 'Toba Samosir',
    postal_code: '22316'
  },
  {
    city_id: '482',
    city_name: 'Tojo Una-Una',
    postal_code: '94683'
  },
  {
    city_id: '483',
    city_name: 'Toli-Toli',
    postal_code: '94542'
  },
  {
    city_id: '484',
    city_name: 'Tolikara',
    postal_code: '99411'
  },
  {
    city_id: '485',
    city_name: 'Tomohon',
    postal_code: '95416'
  },
  {
    city_id: '486',
    city_name: 'Toraja Utara',
    postal_code: '91831'
  },
  {
    city_id: '487',
    city_name: 'Trenggalek',
    postal_code: '66312'
  },
  {
    city_id: '488',
    city_name: 'Tual',
    postal_code: '97612'
  },
  {
    city_id: '489',
    city_name: 'Tuban',
    postal_code: '62319'
  },
  {
    city_id: '490',
    city_name: 'Tulang Bawang',
    postal_code: '34613'
  },
  {
    city_id: '491',
    city_name: 'Tulang Bawang Barat',
    postal_code: '34419'
  },
  {
    city_id: '492',
    city_name: 'Tulungagung',
    postal_code: '66212'
  },
  {
    city_id: '493',
    city_name: 'Wajo',
    postal_code: '90911'
  },
  {
    city_id: '494',
    city_name: 'Wakatobi',
    postal_code: '93791'
  },
  {
    city_id: '495',
    city_name: 'Waropen',
    postal_code: '98269'
  },
  {
    city_id: '496',
    city_name: 'Way Kanan',
    postal_code: '34711'
  },
  {
    city_id: '497',
    city_name: 'Wonogiri',
    postal_code: '57619'
  },
  {
    city_id: '498',
    city_name: 'Wonosobo',
    postal_code: '56311'
  },
  {
    city_id: '499',
    city_name: 'Yahukimo',
    postal_code: '99041'
  },
  {
    city_id: '500',
    city_name: 'Yalimo',
    postal_code: '99481'
  },
  {
    city_id: '501',
    city_name: 'Yogyakarta',
    postal_code: '55111'
  }
];

export default cities;
