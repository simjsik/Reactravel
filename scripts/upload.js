const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
});

const db = admin.firestore();

const hotelDetail = [
    {
        hotelId: '01',
        hotelImg: [
            'https://github.com/user-attachments/assets/5db0e4cd-da85-4ff1-b36f-dd0482a4ffdf',
            'https://github.com/user-attachments/assets/7a657d3a-1e9c-4019-a36e-33c2a94decd2',
            'https://github.com/user-attachments/assets/2090fadc-fb88-43d5-99e1-922a57d2521b',
            'https://github.com/user-attachments/assets/b7fc211f-95c2-4218-8ce5-7291fa7db75f',
            'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
            'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
            'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
            'https://github.com/user-attachments/assets/09852079-a118-4589-ab2b-43b517dad977',
            'https://github.com/user-attachments/assets/76d73658-4e2e-4c3a-b91d-2e2699329d6a',
            'https://github.com/user-attachments/assets/5c5ad595-1d25-4963-bbd4-109e65a2fe84'
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '02',
        hotelImg: [
            'https://github.com/user-attachments/assets/fe5d3679-1e08-4d8b-9e85-5024471021bc',
            'https://github.com/user-attachments/assets/e8e36633-c217-45bf-a718-c256933dd5e6',
            'https://github.com/user-attachments/assets/f1f2d8c7-4be0-4fb5-811f-21b6d995b5e4',
            'https://github.com/user-attachments/assets/903611cb-2873-444b-8641-36cefe0ebdfb',
            'https://github.com/user-attachments/assets/8f7c5b99-66e7-4256-86ed-13ca0dc40c22',
            'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
            'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
            'https://github.com/user-attachments/assets/cf693b7e-a700-4d36-b0a3-eb8f6a5f7a49',
            'https://github.com/user-attachments/assets/68c7f8fe-834d-4b5a-a1d0-e2f19a5a54ac',
            'https://github.com/user-attachments/assets/af4c4a6a-429c-4759-9ee9-bf7b03bcde9c'
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '03',
        hotelImg: [
            'https://github.com/user-attachments/assets/c8171013-6e90-4f07-b035-4ccd7320fd51',
            'https://github.com/user-attachments/assets/c0a3feb5-5f4c-48c0-b8ff-8c6b78157e79',
            'https://github.com/user-attachments/assets/d0d3250f-7298-4a9b-a5d1-6422269ffffb',
            'https://github.com/user-attachments/assets/647cb6a8-0bee-49ac-a8c2-e4a8eb8e37c9',
            'https://github.com/user-attachments/assets/b0fae5c4-3027-4832-a2ee-65641201c2a8',
            'https://github.com/user-attachments/assets/d8f83636-c05f-484b-bca8-bd45f911ebb8',
            'https://github.com/user-attachments/assets/d82a567f-f4af-42fc-bcbf-a3bc8020ce78',
            'https://github.com/user-attachments/assets/b1a0a455-dd99-496e-990f-8849e507cfdf',
            'https://github.com/user-attachments/assets/ac75cd35-e7a6-4b91-a5c1-9b6323d61e2d',
            'https://github.com/user-attachments/assets/435d5da1-a270-470b-a7af-acf6252ed274'
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '04',
        hotelImg: [
            'https://github.com/user-attachments/assets/d344a3cf-bfc9-41dd-a9e3-c7778882a0ea',
            'https://github.com/user-attachments/assets/0fbe34af-3246-4ea5-9afb-670e96c8b758',
            'https://github.com/user-attachments/assets/20135041-ad55-4ebe-8da7-77d15acd9ce1',
            'https://github.com/user-attachments/assets/5e0e62d1-00f8-4de1-84ed-ff174b182e00',
            'https://github.com/user-attachments/assets/55db506f-e0f4-4805-8024-725b42e336cf',
            'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
            'https://github.com/user-attachments/assets/83aa589c-4f6c-4673-b716-0c873350e4d5',
            'https://github.com/user-attachments/assets/4acfc3a4-1ecd-441d-a84a-b7af08ab5b4f',
            'https://github.com/user-attachments/assets/7cfef69e-5e49-4315-8c58-265aa68cae7c',
            'https://github.com/user-attachments/assets/ceadaa0c-e083-4aab-88b1-16737a1643cf',
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '05',
        hotelImg: [
            'https://github.com/user-attachments/assets/efd89067-d3f1-4252-b722-7c7cf1a9eb42',
            'https://github.com/user-attachments/assets/fe9b5e62-4a42-4051-8936-5256078c8458',
            'https://github.com/user-attachments/assets/c1aa7599-3f69-4b49-bd8c-702fa30fac32',
            'https://github.com/user-attachments/assets/60cdce4d-3281-4c05-897e-674f64c3af16',
            'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
            'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
            'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
            'https://github.com/user-attachments/assets/6fe20fb6-169a-4d53-8ea2-6303c4be4122',
            'https://github.com/user-attachments/assets/242056f3-571b-4237-a03c-0f5a4fca931b'
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '06',
        hotelImg: [
            'https://github.com/user-attachments/assets/978d7e99-5662-45f4-badf-2d0e7640d173',
            'https://github.com/user-attachments/assets/7f92dc55-44a9-4ba3-9907-90205b9d3bd1',
            'https://github.com/user-attachments/assets/65e4f994-6c67-4275-af2b-d5a13bfa3567',
            'https://github.com/user-attachments/assets/425b39a9-86a8-4dfa-8dae-7582129e4155',
            'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
            'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
            'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
            'https://github.com/user-attachments/assets/6fe20fb6-169a-4d53-8ea2-6303c4be4122',
            'https://github.com/user-attachments/assets/242056f3-571b-4237-a03c-0f5a4fca931b',
            'https://github.com/user-attachments/assets/ae264e4e-a3e9-4a49-8bcd-0d6f620f0756'
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '07',
        hotelImg: [
            'https://github.com/user-attachments/assets/b2f19e79-ab56-464d-83e7-5be9b07d992f',
            'https://github.com/user-attachments/assets/34598c47-d25c-44e3-a854-0026d8b67116',
            'https://github.com/user-attachments/assets/a3ce7491-32f7-4adf-99b1-a5e89f0974fc',
            'https://github.com/user-attachments/assets/29803690-7aca-4756-923d-580a9b5e591e',
            'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
            'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
            'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
            'https://github.com/user-attachments/assets/6fe20fb6-169a-4d53-8ea2-6303c4be4122',
            'https://github.com/user-attachments/assets/242056f3-571b-4237-a03c-0f5a4fca931b',
            'https://github.com/user-attachments/assets/ae264e4e-a3e9-4a49-8bcd-0d6f620f0756'
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '08',
        hotelImg: [
            'https://github.com/user-attachments/assets/560baca6-fd1d-41f3-b83b-d5cb768df7ca',
            'https://github.com/user-attachments/assets/ce3bae56-43a4-4f83-ac66-164787694cab',
            'https://github.com/user-attachments/assets/fa442823-0822-4167-9f83-add11d9cafd3',
            'https://github.com/user-attachments/assets/f5f67c46-591e-476d-9666-76065340ae56',
            'https://github.com/user-attachments/assets/f7025f8c-8db8-46b7-a05a-bcf271e6b80c',
            'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
            'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
            'https://github.com/user-attachments/assets/6fe20fb6-169a-4d53-8ea2-6303c4be4122',
            'https://github.com/user-attachments/assets/242056f3-571b-4237-a03c-0f5a4fca931b',
            'https://github.com/user-attachments/assets/ae264e4e-a3e9-4a49-8bcd-0d6f620f0756'
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '09',
        hotelImg: [
            'https://github.com/user-attachments/assets/967c37a0-aad9-436f-863b-7ca4f6897f3c',
            'https://github.com/user-attachments/assets/333a3298-467b-4129-be11-0e4e56ee3ad4',
            'https://github.com/user-attachments/assets/00f80cf4-a814-4ee3-af2b-a0467bb566ba',
            'https://github.com/user-attachments/assets/2472f5e2-07cb-477c-9dd3-eeddf461a2ae',
            'https://github.com/user-attachments/assets/a2adec1d-2650-4e62-a78d-9671e0199531',
            'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
            'https://github.com/user-attachments/assets/6f9284c4-35ae-4d00-b688-9e3aa1bd95e8',
            'https://github.com/user-attachments/assets/5400298d-c56a-4420-8ecc-db3657b51b7c',
            'https://github.com/user-attachments/assets/f69f6d49-6e6e-4b4d-8ab4-771765d10d64',
            'https://github.com/user-attachments/assets/26ad5c1f-d545-4d11-91a2-05c17d73e2b5',
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '010',
        hotelImg: [
            'https://github.com/user-attachments/assets/73c169ef-3b32-4358-850a-eace2e95e299',
            'https://github.com/user-attachments/assets/2c558761-7d4c-431a-a826-6dbdf16b77d9',
            'https://github.com/user-attachments/assets/7d65977a-73ba-4446-91be-e29112502c3d',
            'https://github.com/user-attachments/assets/c37db558-fc66-41bc-bfbc-75bbde579565',
            'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
            'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
            'https://github.com/user-attachments/assets/6f9284c4-35ae-4d00-b688-9e3aa1bd95e8',
            'https://github.com/user-attachments/assets/5400298d-c56a-4420-8ecc-db3657b51b7c',
            'https://github.com/user-attachments/assets/f69f6d49-6e6e-4b4d-8ab4-771765d10d64',
            'https://github.com/user-attachments/assets/26ad5c1f-d545-4d11-91a2-05c17d73e2b5',
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '011',
        hotelImg: [
            'https://github.com/user-attachments/assets/d0e8972c-82df-4af0-8bc0-caca089f93d7',
            'https://github.com/user-attachments/assets/0395a1c5-bd98-49fa-bb07-4536f8de4449',
            'https://github.com/user-attachments/assets/09a7f475-9aad-47e0-8db4-98d9a41541b9',
            'https://github.com/user-attachments/assets/749d6e10-3a64-438c-ab37-46dcae1f92e8',
            'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
            'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
            'https://github.com/user-attachments/assets/6f9284c4-35ae-4d00-b688-9e3aa1bd95e8',
            'https://github.com/user-attachments/assets/5400298d-c56a-4420-8ecc-db3657b51b7c',
            'https://github.com/user-attachments/assets/f69f6d49-6e6e-4b4d-8ab4-771765d10d64',
            'https://github.com/user-attachments/assets/26ad5c1f-d545-4d11-91a2-05c17d73e2b5',
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '012',
        hotelImg: [
            'https://github.com/user-attachments/assets/cb51ee4c-fab9-4619-9ac8-b59360d1f57b',
            'https://github.com/user-attachments/assets/7386b83e-ff2c-4529-9a6d-7bcd0c35e289',
            'https://github.com/user-attachments/assets/ee5141b5-c556-4d0c-a50c-23fdffefe4d8',
            'https://github.com/user-attachments/assets/bd361f76-ae32-4723-bb1d-c560c06bb89c',
            'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
            'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
            'https://github.com/user-attachments/assets/6f9284c4-35ae-4d00-b688-9e3aa1bd95e8',
            'https://github.com/user-attachments/assets/5400298d-c56a-4420-8ecc-db3657b51b7c',
            'https://github.com/user-attachments/assets/f69f6d49-6e6e-4b4d-8ab4-771765d10d64',
            'https://github.com/user-attachments/assets/26ad5c1f-d545-4d11-91a2-05c17d73e2b5',
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '013',
        hotelImg: [
            'https://github.com/user-attachments/assets/368d067b-00aa-4d4d-af2b-54b1ea4927df',
            'https://github.com/user-attachments/assets/3606b347-d73e-4957-b74e-3d47396c86fb',
            'https://github.com/user-attachments/assets/690f14de-f41d-4739-bfec-f1121e8e2412',
            'https://github.com/user-attachments/assets/06a0ffdb-23ae-44b0-88da-65f21b454178',
            'https://github.com/user-attachments/assets/4a89abaa-1efe-4f98-a21c-8d26f2d126a8',
            'https://github.com/user-attachments/assets/aee8d68d-01c7-4d65-a4ce-883a55de5baf',
            'https://github.com/user-attachments/assets/f71d8cd0-974c-4da4-af5f-2f974619cffe',
            'https://github.com/user-attachments/assets/01d6031c-e1c2-4162-a744-e71a910797f2',
            'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
            'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '014',
        hotelImg: [
            'https://github.com/user-attachments/assets/80990f05-feda-430a-b8d5-c5b400971641',
            'https://github.com/user-attachments/assets/b3d9d079-b358-4fed-a74f-542f1b8e8225',
            'https://github.com/user-attachments/assets/40ee9ae6-92b7-4ffa-875e-b6b070876424',
            'https://github.com/user-attachments/assets/449ae0f2-ba0c-4aea-bc05-6ff9509f63b1',
            'https://github.com/user-attachments/assets/01d6031c-e1c2-4162-a744-e71a910797f2',
            'https://github.com/user-attachments/assets/f71d8cd0-974c-4da4-af5f-2f974619cffe',
            'https://github.com/user-attachments/assets/aee8d68d-01c7-4d65-a4ce-883a55de5baf',
            'https://github.com/user-attachments/assets/4a89abaa-1efe-4f98-a21c-8d26f2d126a8',
            'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
            'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',

        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '015',
        hotelImg: [
            'https://github.com/user-attachments/assets/40ff05d8-0c66-4ad0-8ec4-6780e6e9574e',
            'https://github.com/user-attachments/assets/63c4e7f9-5298-41a9-8cc6-d7991477bea6',
            'https://github.com/user-attachments/assets/0f6ef2d0-21c4-4141-9c1b-67be554b8e06',
            'https://github.com/user-attachments/assets/cf6d9261-d024-41d1-a50d-36edfb0556ae',
            'https://github.com/user-attachments/assets/96b10826-0058-45a0-8996-ec63e148fb52',
            'https://github.com/user-attachments/assets/4a89abaa-1efe-4f98-a21c-8d26f2d126a8',
            'https://github.com/user-attachments/assets/aee8d68d-01c7-4d65-a4ce-883a55de5baf',
            'https://github.com/user-attachments/assets/f71d8cd0-974c-4da4-af5f-2f974619cffe',
            'https://github.com/user-attachments/assets/01d6031c-e1c2-4162-a744-e71a910797f2',
            'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
    {
        hotelId: '016',
        hotelImg: [
            'https://github.com/user-attachments/assets/862a6570-1c4e-4343-baa4-81dd55a44056',
            'https://github.com/user-attachments/assets/adc6999f-b0b6-4764-b580-ca9150864282',
            'https://github.com/user-attachments/assets/8921ef2c-aa54-462b-b406-a263d85f4f4e',
            'https://github.com/user-attachments/assets/2b15d73d-4afc-436f-9e8b-7b39b384e389',
            'https://github.com/user-attachments/assets/f4590416-b6f0-426a-9575-f79d0c51b512',
            'https://github.com/user-attachments/assets/4a89abaa-1efe-4f98-a21c-8d26f2d126a8',
            'https://github.com/user-attachments/assets/aee8d68d-01c7-4d65-a4ce-883a55de5baf',
            'https://github.com/user-attachments/assets/f71d8cd0-974c-4da4-af5f-2f974619cffe',
            'https://github.com/user-attachments/assets/01d6031c-e1c2-4162-a744-e71a910797f2',
            'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
        ],
        hotelDetail: ['*얼리 체크인은 체크인 당일 객실 상황에 따라 가능 여부가 결정되기 때문에 사전 확정이 불가능합니다. 체크인 당일에 얼리 체크인이 가능한 경우, 프런트에서 추가 비용을 안내해드리고 있습니다.'],
        hotelPoint: [
            { title: '다양한 조식 옵션', imgUrl: 'https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65' },
            { title: '주차장 이용 가능', imgUrl: 'https://github.com/user-attachments/assets/d91a46ff-ac86-4cba-8565-e69c45855aa2' },
            { title: '다양한 즐길거리', imgUrl: 'https://github.com/user-attachments/assets/f408a3b1-7030-4c80-82f4-73bebd9d5ff7' },
            { title: '위치 최고', imgUrl: 'https://github.com/user-attachments/assets/8e082ae3-76e8-4f06-b275-a153b762c651' },
            { title: '좋은 전망', imgUrl: 'https://github.com/user-attachments/assets/112d1838-61ce-4264-9afc-d4ff3cc4a897' },
        ], // 포인트
        hotelFacility: [
            { title: '피트니스룸', imgUrl: 'https://github.com/user-attachments/assets/fc2db4fc-7987-49bb-b02f-491d7b34259c' },
            { title: '음식점', imgUrl: 'https://github.com/user-attachments/assets/d1ca3f6e-59e7-4d86-b1ba-bd23c12a6b93' },
            { title: '회의실', imgUrl: 'https://github.com/user-attachments/assets/a294ca82-7581-42ae-b022-9fd47d97f998' },
            { title: '짐 보관 서비스', imgUrl: 'https://github.com/user-attachments/assets/71c124dc-59e2-46d0-9f43-d480dbeb7e4e' },
        ], // 기능
        hotelRoom: [
            {
                roomId: '01',
                roomTitle: '스탠다드 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/c9b30b8e-1dc9-431b-9f70-81566b814646',
                    'https://github.com/user-attachments/assets/c77925df-2be2-4d8a-aa88-2ea2ca09baf3',
                    'https://github.com/user-attachments/assets/0637d60a-4fc7-46b0-82ec-a6dd068caf78',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.0,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '2',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '더블 침대 1개(너비 1.36m)', imgUrl: 'https://github.com/user-attachments/assets/87cd6430-bb0e-4278-9ea8-d7b0fd46e3e7' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            },
            {
                roomId: '02',
                roomTitle: '디럭스 트윈룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/98aa409f-6c5a-4811-b74d-436a56ae1b90',
                    'https://github.com/user-attachments/assets/acca0366-f938-4830-abfc-bdf8e0294ede',
                    'https://github.com/user-attachments/assets/e916bbf9-57a7-41b7-9c92-ad749bfbab8f',
                    'https://github.com/user-attachments/assets/db4d09b8-e53a-41c5-b07b-abc76631bef4',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.15,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '3',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 2개(너비 1.11m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]
            },
            {
                roomId: '03',
                roomTitle: '그랜드 트리플룸',
                roomImg: [
                    'https://github.com/user-attachments/assets/dd4295d7-e108-48cd-8a44-8e02b0f84723',
                    'https://github.com/user-attachments/assets/5d72d0d8-2ff3-4104-8f9e-d857e5ce343a',
                    'https://github.com/user-attachments/assets/2f60b584-98a4-43b9-a29d-bd062ef76966',
                    'https://github.com/user-attachments/assets/a2fe67a3-53c2-4e1e-8d4b-9497699ac830',
                    'https://github.com/user-attachments/assets/b382656e-a167-4e22-b413-18b71d3f2d3e',
                    'https://github.com/user-attachments/assets/b2986a2b-9d54-41e1-af6a-4a40d549ddf5',
                    'https://github.com/user-attachments/assets/ad999556-0fad-4169-bf0a-dc64bf18771a',
                    'https://github.com/user-attachments/assets/b1f66f21-8132-415b-87dc-837a53324660',
                ],
                roomPrice: 1.25,
                roomRepund: false,
                roomBreakfast: true,
                roomOnlinePay: true,
                roomCapacity: '4',
                roomDetail: [
                    {
                        roomDetailMain: [
                            { title: '싱글 침대 3개(너비 0.96m)', imgUrl: 'https://github.com/user-attachments/assets/597eee21-7f0a-4de9-839b-492e8b4907ce' },
                            { title: '금연', imgUrl: 'https://github.com/user-attachments/assets/b8bc9984-d829-425e-8372-1a508edae08e' },
                            { title: '20㎡ | 15-22층', imgUrl: 'https://github.com/user-attachments/assets/1aec627a-9f05-48b6-8a6f-83b5ec578ef6' },
                            { title: '무료 Wi-Fi', imgUrl: 'https://github.com/user-attachments/assets/4d91435c-9a75-46d1-a2d4-0de4daa91f47' },
                            { title: '에어컨', imgUrl: 'https://github.com/user-attachments/assets/608bc0be-d855-4b55-92b5-180bc16998e4' },
                            { title: '개인 욕실', imgUrl: 'https://github.com/user-attachments/assets/b7006f8e-8147-4e36-8cc5-30da9ae5c15c' }
                        ],
                        roomToiletries: [
                            { title: '칫솔 & 치약', imgUrl: 'https://github.com/user-attachments/assets/a378b383-70ee-4951-99ca-c482707d4e5b' },
                            { title: '샴푸', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '바디워시', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '헤어 컨디셔너', imgUrl: 'https://github.com/user-attachments/assets/f96419da-2966-4d14-8bb0-b3dc58fc98e3' },
                            { title: '샤워캡', imgUrl: 'https://github.com/user-attachments/assets/d8d5b869-c219-435f-9b57-cd8dae96ffe4' },
                            { title: '면도기', imgUrl: 'https://github.com/user-attachments/assets/2db709fa-0674-4a9a-889f-4df94a7b74f9' },
                            { title: '비누', imgUrl: 'https://github.com/user-attachments/assets/feba92ea-320b-4e03-8250-bd648bcdce33' }
                        ],
                        roomCleaning: '객실 청소 (매일 제공)',
                        roomFacilityDisability: ['계단 없는 입구', '변기 (팔걸이)', '세면대 (낮은 높이)'],
                        roomRayout: ['옷장', '책상', '개인 전용 출입구'],
                        roomDevice: ['객실 Wi-Fi', '전화기', '장거리 국제 전화'],
                        roomFood: ['티백', '생수', '전기 주전자'],
                        roomBathroom: ['개인 욕실', '개인 화장실', '헤어드라이어', '메이크업용 확대 거울', '목욕 가운', '수건', '슬리퍼', '24시간 온수', '욕조 & 샤워 시설'],
                        roomFacility: ['에어컨', 'TV', '난방 시설', '커튼 (암막)', '냉장고', '객실 내 금고', '110 & 220V 콘센트'],
                        roomChild: false,
                        roomInfo: '기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.'
                    }
                ]

            }
        ],
    },
]

async function uploadData() {
    const batch = db.batch();

    hotelDetail.forEach(hotel => {
        const docRef = db.collection('hotels').doc(hotel.hotelId);
        batch.set(docRef, hotel);
    });

    await batch.commit();
    console.log('데이터 업로드 완료');
}

uploadData().catch(console.error);