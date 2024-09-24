import React, { useEffect, useRef, useState } from "react";
import './MainFinder.css'
import { useRecoilState, useRecoilValue } from "recoil";
import { roomState, adultState, childState, setterState, previewState, searchTermState, filterDataState, hotelDataState, regionDataState, filteredHotelSelector, searchResultDataState, defaultCheckInState, defaultCheckOutState, nightState, modalState, finderState, mediaState, calenderState, mbSetterState } from "../../recoil";
import { useLocation, useNavigate } from "react-router-dom";
import useHotelDetail from "../Hook/useHotelDetail";

const MainFinder: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [room, setRoom] = useRecoilState<number>(roomState);
    const [adult, setAdult] = useRecoilState<number>(adultState);
    const [child, setChild] = useRecoilState<number>(childState);
    const [setter, setSetter] = useRecoilState(setterState);
    const [mbSetter, setMbSetter] = useRecoilState(mbSetterState);
    const [mbCalender, setMbCalender] = useRecoilState<boolean>(calenderState);
    const [preview, setPreview] = useRecoilState(previewState);
    const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
    const [filterData, setFilterData] = useRecoilState<any[]>(searchResultDataState);
    const [previewData, setPreviewData] = useRecoilState<any[]>(filterDataState);
    const [modal, setModal] = useRecoilState<boolean>(modalState)
    const [finderOn, setFinderOn] = useRecoilState<boolean>(finderState)

    const media = useRecoilValue(mediaState)

    const [hoverDate, setHoverDate] = useState<Date | null>(null)
    const [capacity, setCapacity] = useState<number>(room * 4)
    const [onCalender, setOnCalender] = useState<boolean>(false);

    const [clickCheckIn, setClickCheckIn] = useState<Date>(new Date())
    const [clickCheckOut, setClickCheckOut] = useState<Date | string>(new Date(clickCheckIn.getTime() + 86400000))
    // state

    const reviewInputRef = useRef<HTMLInputElement>(null);
    const settingBoxRef = useRef<HTMLDivElement>(null);
    const calendarBoxRef = useRef<HTMLDivElement>(null);
    // ref

    const today = new Date()
    const toDate = `${today.getFullYear()}.${today.getMonth().toString().padStart(2, '0')}.${today.getDate().toString().padStart(2, '0')}`

    let hotelQuery: string | null = null;
    let roomQuery: string | null = null;
    let nightCount = 1

    const param = new URLSearchParams(location.search)
    const query = param.get('query')
    const { hotelDetail, error } = useHotelDetail();

    if (query) {
        const parts = query.split('_');
        if (parts.length === 2) {
            hotelQuery = parts[0]
            roomQuery = parts[1]
        }
    }

    const hotelData = useRecoilValue(hotelDataState);
    const regionData = useRecoilValue(regionDataState);
    const filteredHotels = useRecoilValue(filteredHotelSelector);
    // data

    const capacityHandle = () => {
        if (query) {
            const hotels = hotelDetail.find(id => id.hotelId === hotelQuery)

            if (hotels) {
                const hotelCapacity = parseInt(hotels.hotelRoom.find(c => c.roomId === roomQuery)?.roomCapacity || '0', 10)

                if (hotelCapacity) {
                    if ((hotelCapacity * room) < adult) {
                        setAdult(hotelCapacity * room)
                    }
                }
                if (hotelCapacity) {
                    setCapacity(hotelCapacity * room)
                } else {
                    setCapacity(room * 4)
                }
            }
        }
    } // 객실 인원 수

    const [currentIndex, setCurrentIndex] = useState(0);

    // 날짜 가져오기
    const [defaultCheckIn, setDefaultCheckIn] = useRecoilState<Date | null>(defaultCheckInState);
    const [defaultCheckOut, setDefaultCheckOut] = useRecoilState<Date | null | string>(defaultCheckOutState);

    // 몇박 며칠 표시하기
    const [night, setNight] = useRecoilState<number>(nightState)

    const [calendarClickCount, setCalendarClickCount] = useState<number>(0);

    const months = [
        { year: 2024, month: 8, name: '8월' },
        { year: 2024, month: 9, name: '9월' },
        { year: 2024, month: 10, name: '10월' },
        { year: 2024, month: 11, name: '11월' },
        { year: 2024, month: 12, name: '12월' },
        { year: 2025, month: 1, name: '1월' },
        { year: 2025, month: 2, name: '2월' },
        { year: 2025, month: 3, name: '3월' },
        { year: 2025, month: 4, name: '4월' },
    ];

    // 날짜 타입 설정
    const formatDate = (date: Date | string | null) => {
        if (typeof date === 'string') return date;
        if (!date) return '날짜를 선택해 주세요';
        return `${String(date.getMonth() + 1)}월 ${String(date.getDate())}일`;
    }


    // 캘린더 넘기기
    const setCalenderPrev = (setIndex: React.Dispatch<React.SetStateAction<number>>, min: number) => {
        setIndex((prevIndex) => prevIndex > min ? prevIndex - 1 : min)
    }

    const setCalenderNext = (setIndex: React.Dispatch<React.SetStateAction<number>>, max: number) => {
        setIndex((prevIndex) => prevIndex < max ? prevIndex + 1 : max)
    }

    // 캘린더 온 오프
    const toggleCalender = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setOnCalender((prev) => !prev);
        setMbCalender((prev) => !prev);
        setSetter(false);
        setPreview(false);
        setCurrentIndex(0);
        if (location.pathname === '/detail') {
            if (media < 2) {
                setModal((prev) => !prev)
            }
        }
    }

    // 인원, 객실 수 기능
    const increBtn = (event: React.MouseEvent<HTMLButtonElement>, setData: React.Dispatch<React.SetStateAction<number>>, max: number) => {
        event.stopPropagation();
        setData((prevData) => {
            if (prevData === null) return 1;
            return prevData < max ? prevData + 1 : max
        });
        console.log(capacity)
    }

    const decreBtn = (event: React.MouseEvent<HTMLButtonElement>, setData: React.Dispatch<React.SetStateAction<number>>, min: number) => {
        event.stopPropagation();
        setData((prevData) => {
            if (prevData === null) return 1;
            return prevData > min ? prevData - 1 : min
        })
    }

    // 객실 당.. 세팅 박스 온 오프
    const toggleSetter = (event: React.MouseEvent) => {
        event.stopPropagation()
        setSetter((prev) => !prev);
        setPreview(false);
        setOnCalender(false)
        if (media < 2 && (location.pathname === '/detail' || location.pathname === '/reserve')) {
            setMbSetter((prev) => !prev)
            setModal((prev) => !prev)
        }
    }

    const previewClick = (title: string) => {
        setSearchTerm(title);
        setPreview(false)
    }

    // 검색 버튼 클릭
    const searchClick = () => {
        setFilterData(filteredHotels);
        navigate(`/search?query=${searchTerm}`);
        setFinderOn(false)
        setModal(false)
    }

    const handleHover = (day: number, month: number, year: number) => {
        if (calendarClickCount === 1) {
            setHoverDate(new Date(year, month - 1, day))
        }
    }

    // 날짜 클릭 기능
    const reSetCheck = (day: number, month: number, year: number) => {
        const clickedDate = new Date(year, month - 1, day);
        const clickedDay = `${clickedDate.getFullYear()}.${clickedDate.getMonth().toString().padStart(2, '0')}.${clickedDate.getDate().toString().padStart(2, '0')}`
        const allDays = document.querySelectorAll('.check')
        const currentDay = document.querySelector(
            `.calender_month_view td[data-day='${day}'][data-month='${month}'][data-year='${year}']`
        )
        if (clickedDay < toDate) {
            setCalendarClickCount((prev) => prev)
            return
        }
        if (calendarClickCount === 0) {
            if (currentDay && currentDay.classList.contains('check')) {
                allDays.forEach(day => day.classList.remove('check'));
            }

            setClickCheckIn(clickedDate)
            setClickCheckOut('날짜를 선택해 주세요')
            setNight(0)
            setCalendarClickCount(1);
        } else if (calendarClickCount === 1) {
            if (clickCheckIn && clickedDate <= clickCheckIn) {
                setClickCheckIn(clickedDate)
                setCalendarClickCount(1);
            } else {
                setClickCheckOut(clickedDate);
                if (media > 1) {
                    setDefaultCheckIn(clickCheckIn);
                    setDefaultCheckOut(clickedDate);
                    setOnCalender(false)
                }
                setCalendarClickCount(0);
            }
        }
    }
    const setCheckDay = () => {
        const days = document.querySelectorAll('.Days')
        if (clickCheckIn instanceof Date && clickCheckOut instanceof Date) {
            setDefaultCheckIn(clickCheckIn)
            setDefaultCheckOut(clickCheckOut)
            days.forEach(day => day.classList.remove('inRange'))

            setOnCalender(false)
            setMbCalender(false)
        } else {
            alert('날짜를 전부 선택 해주세요')
            return
        }
    }

    useEffect(() => { // 검색창 기능.

        // 검색어가 비었을 경우 필터링된 호텔, 지역 데이터를 빈 배열로 설정
        if (searchTerm === '') {
            setPreviewData([]);
            setPreview(false);
            return;
        } else {
            // 검색어가 있을 경우, 호텔 데이터를 필터링
            const filteredHotel = hotelData.filter(hotel =>
                hotel.title.toLowerCase().includes(searchTerm.toLowerCase())
                ||
                (Array.isArray(hotel.region) && hotel.region.some(region => region.toLowerCase().includes(searchTerm.toLowerCase())))
                ||
                hotel.country.toLowerCase().includes(searchTerm.toLowerCase())
                ||
                (Array.isArray(hotel.searchWord) && hotel.searchWord.some(search => search.toLowerCase().includes(searchTerm.toLowerCase().replace(/\s+/g, ''))))
            );
            //  검색어가 있을 경우, 지역 데이터를 필터링
            const filteredRegion = regionData.filter(region =>
                region.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                region.subTitle.toLowerCase().includes(searchTerm.toLowerCase())
            );

            //  필터링 된 데이터를 하나의 배열로 합침.
            const combinedData = ([
                // 필터링된 데이터가 각각 2,3개 이상일 경우 삭제
                ...filteredRegion.slice(0, 3).map(item => ({ ...item, type: 'region' })),
                ...filteredHotel.slice(0, 2).map(item => ({ ...item, type: 'hotel' }))
            ])

            // 필터링된 데이터를 필터 데이터에 설정
            setPreviewData(combinedData);

            // 필터링된 데이터의 길이가 0 이상일 때만 true로 설정
            setPreview(combinedData.length > 0);
        }
    }, [searchTerm, hotelData, regionData, setPreviewData, setPreview])

    useEffect(() => { // 요소 외 클릭 시 닫기 기능.
        const clickOutside = (event: MouseEvent) => {
            if (media > 1) {
                if (settingBoxRef.current && !settingBoxRef.current.contains(event.target as Node)) {
                    setSetter(false);
                }
                if (reviewInputRef.current && !reviewInputRef.current.contains(event.target as Node)) {
                    setPreview(false);
                }
                if (calendarBoxRef.current && !calendarBoxRef.current.contains(event.target as Node)) {
                    setOnCalender(false)
                }
            }
        };

        document.addEventListener('click', clickOutside);
        return () => {
            document.removeEventListener('click', clickOutside);
        }
    }, [settingBoxRef, reviewInputRef, calendarBoxRef])

    // 로컬 스토리지에 체크인, 체크아웃, 객실 정보 담기
    useEffect(() => {
        if (location.pathname !== "/") {
            const storedCheckIn = localStorage.getItem('defaultCheckIn');
            const storedCheckOut = localStorage.getItem('defaultCheckOut');
            const storedFew = localStorage.getItem('night');
            const storedRoom = localStorage.getItem('room');
            const storedAdult = localStorage.getItem('adult');
            const storedChild = localStorage.getItem('child');

            if (storedCheckIn) {
                setDefaultCheckIn(new Date(storedCheckIn));
            } else {
                setDefaultCheckIn(new Date());
            }

            if (storedCheckOut) {
                setDefaultCheckOut(new Date(storedCheckOut));
            } else {
                setDefaultCheckOut(new Date(Date.now() + 86400000));
            }

            setNight(storedFew ? parseInt(storedFew, 10) : 1)
            setRoom(storedRoom ? parseInt(storedRoom, 10) : 1)
            setAdult(storedAdult ? parseInt(storedAdult, 10) : 1)
            setChild(storedChild ? parseInt(storedChild, 10) : 0)
        } else if (location.pathname === '/') {
            setDefaultCheckIn(new Date());
            setDefaultCheckOut(new Date(Date.now() + 86400000));
            setNight(1)
            setRoom(1)
            setAdult(1)
            setChild(0)
        }

    }, [setDefaultCheckIn, setDefaultCheckOut, setRoom, setAdult, setChild, setNight])

    // 상태가 변경되면 스토리지에 저장
    useEffect(() => {
        const handleStorage = () => {
            if (defaultCheckIn instanceof Date) {
                localStorage.setItem('defaultCheckIn', defaultCheckIn.toISOString());
            }
            if (defaultCheckOut instanceof Date) {
                localStorage.setItem('defaultCheckOut', defaultCheckOut.toISOString());
            }
            if (night !== null) {
                localStorage.setItem('night', night.toString());
            }
            if (room !== null) {
                localStorage.setItem('room', room.toString());
            }
            if (adult !== null) {
                localStorage.setItem('adult', adult.toString());
            }
            if (child !== null) {
                localStorage.setItem('child', child.toString());
            }
        };
        handleStorage();
    }, [defaultCheckIn, defaultCheckOut, room, adult, child, night])

    useEffect(() => {
        capacityHandle()
    }, [location, room])

    useEffect(() => {
        setOnCalender(false)
        setSetter(false)
    }, [location])

    useEffect(() => {
        if (hoverDate instanceof Date) {
            const fewNight = (Math.abs(hoverDate.getTime() - (clickCheckIn?.getTime() || 0)))
            nightCount = Math.ceil(fewNight / (1000 * 60 * 60 * 24));
            setNight(nightCount)
        }
    }, [hoverDate, defaultCheckIn])

    const renderMonth = (month: { year: number, month: number, name: string }) => {
        // 주(week)와 일(day)를 저장할 변수 선언
        // typeScrit에서 변수 타입을 명시적으로 지정. = JSX.Element[]
        let weeks: JSX.Element[] = [];
        let days: JSX.Element[] = [];

        // const month = months[m];

        const today = new Date()
        const nextDay = new Date(today.getTime() + 86400000)

        // 현재 달의 date객체(마지막 날짜)를 가져옴. 
        const daysInMonth = new Date(month.year, month.month, 0).getDate();

        // 이전 달의 date 객체를 가져옴.
        const prevInMonth = new Date(month.year, month.month - 1, 0).getDate();

        // 해당 달(month)의 1일을 계산. ex) 1일이 월요일이면 일요일부터 0이므로 1이 됨.
        const firstDayIndex = new Date(month.year, month.month - 1, 1).getDay();

        // 이전 달의 날짜 추가
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            days.push(<td key={`prevDay_${i}`} className='prevDay days'><div>{prevInMonth - i}</div></td>)
        }

        // 현재 달의 날짜(days)를 주(weeks)에 추가 후 날짜를 비움.    
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(month.year, month.month - 1, day)

            const isToday = (today.getDate() === day && today.getMonth() + 1 === month.month && today.getFullYear() === month.year)
            const isNextDay = (nextDay.getDate() === day && nextDay.getMonth() + 1 === month.month && nextDay.getFullYear() === month.year);

            const isCheckIn = currentDate.getTime() === clickCheckIn?.getTime()
            const isCheckOut = clickCheckOut instanceof Date && currentDate.getTime() === clickCheckOut?.getTime();


            const isPastday = new Date(month.year, month.month - 1, day + 1) < today;

            const inRangeClass =
                onCalender
                &&
                (
                    (clickCheckIn &&
                        clickCheckOut instanceof Date &&
                        currentDate > clickCheckIn &&
                        currentDate < clickCheckOut ? 'inRange' : '')
                    ||
                    ((hoverDate instanceof Date && media > 1 &&
                        clickCheckIn instanceof Date &&
                        currentDate > clickCheckIn &&
                        currentDate < hoverDate) ? 'inRange' : '')
                )


            days.push(
                <td key={day}
                    className={`days
                    ${isToday && !isNextDay && !isCheckIn && !isCheckOut ? 'today' : ''}
                    ${!isToday && isNextDay && !isCheckIn && !isCheckOut ? 'nextday' : ''}
                    ${isCheckIn ? 'checkIn' : ''}
                    ${isCheckOut ? 'checkOut' : ''}
                    ${isPastday ? 'past' : ''}
                    ${onCalender && ((!isToday && !isNextDay) && inRangeClass)}
                    `}
                    onClick={() => reSetCheck(day, month.month, month.year)}
                    onMouseEnter={() => handleHover(day, month.month, month.year)}
                >
                    <div>
                        {day}
                    </div>
                </td>
            );

            // days 배열에 day를 추가. day 7개가 추가 됐다면 weeks 배열에 days를 추가 후 days 배열 초기화
            if ((day + firstDayIndex) % 7 === 0 || day === daysInMonth) {
                weeks.push(<tr key={day}>{days}</tr>)
                days = [];
            }
        }

        return (
            <div className="calendar_month_view" key={month.month}>

                <div className="calendar_month">
                    {`${month.year}년 ${month.name}`}
                </div>
                <table>
                    <tbody>
                        {media > 1 &&
                            <div className='calendar_week'>
                                <span>일</span>
                                <span>월</span>
                                <span>화</span>
                                <span>수</span>
                                <span>목</span>
                                <span>금</span>
                                <span>토</span>
                            </div>
                        }
                        {weeks}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className={`hotel_search_wrap
            ${location.pathname === '/home' ? 'home_finder'
                : location.pathname === '/search' ? 'search_finder'
                    : location.pathname === '/detail' ? 'detail_finder'
                        : location.pathname === '/reserve' ? 'reserve_finder'
                            : ''
            }`}>
            <div className='hs_title'>
                <p>수백 개의 여행지와 호텔을</p>
                <p>한 번에 검색하고 비교해 보세요.</p>
            </div>
            <div className='hs_destination'>
                <p>여행지</p>
                <input
                    ref={reviewInputRef}
                    placeholder='도시, 호텔, 공항 또는 랜드마크'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={() => setPreview(!!searchTerm)}
                />
                <div className="alert">
                    <p>대한민국, 일본, 필리핀, 태국이 구현되어 있습니다!</p>
                </div>
                {/* 검색어가 바뀔 때마다 호텔 목록 필터링 */}
                {
                    preview &&
                    <div className="hs_search_preview">
                        <ul>
                            {
                                previewData.length > 0 && (<>{
                                    previewData.map((item, index) => (
                                        <li
                                            key={index}
                                            className={item.type === 'region' ? 'hs_preview_box regionBox' : 'hs_preview_box hotelBox'}
                                            onClick={() => previewClick(item.title)}
                                        >
                                            {
                                                item.type === 'region' ? <div className="region_img" style={{ backgroundImage: `url(${item.img})` }}></div> : null
                                            }
                                            <div className="preview_text_box">
                                                <span className={item.type === 'region' ? 'regionTitle' : 'hotelTitle'}>
                                                    {item.title}
                                                </span>
                                                <p>
                                                    {
                                                        item.type === 'hotel' ? `${item.region}, ${item.country}` : item.subTitle
                                                    }
                                                </p>
                                            </div>
                                        </li>
                                    ))
                                }</>)
                            }
                        </ul>
                    </div>
                }
            </div>
            <div className='hs_check'>
                <div className="check_in" onClick={toggleCalender}>
                    <p>체크인</p>
                    <div className='hs_check_in'>{formatDate(defaultCheckIn)}</div>
                </div>
                <div className="center_line"></div>
                <div className="check_out" onClick={toggleCalender}>
                    <p>체크아웃</p>
                    <div className='hs_check_out'>{formatDate(defaultCheckOut)}</div>
                </div>
                <div className='hs_calender'>
                    {
                        onCalender === true &&
                        <>
                            {media < 2 ?
                                <>
                                    <div className='mb_calendar_top_nav'>
                                        <div className="mb_calendar_close" onClick={toggleCalender}></div>
                                        <p>날짜 선택</p>
                                        <div className='calendar_week'>
                                            <span>일</span>
                                            <span>월</span>
                                            <span>화</span>
                                            <span>수</span>
                                            <span>목</span>
                                            <span>금</span>
                                            <span>토</span>
                                        </div>
                                    </div>
                                    <div className="calendar" ref={calendarBoxRef}>
                                        <header className="calendar_header">
                                            {media > 1 ?
                                                <>
                                                    {renderMonth(months[currentIndex])}
                                                    {renderMonth(months[(currentIndex + 1) % months.length])}
                                                </>
                                                :
                                                <>
                                                    {months.map(renderMonth)}
                                                </>
                                            }
                                        </header>
                                        <button className='calendarPrev' onClick={() => setCalenderPrev(setCurrentIndex, 0)}><img src='https://github.com/simjsik/savefile/assets/39624384/d99b0090-cf55-4f4d-ad23-59f124992614' alt="이전"></img></button>
                                        <button className='calendarNext' onClick={() => setCalenderNext(setCurrentIndex, months.length - 2)}><img src='https://github.com/simjsik/savefile/assets/39624384/3ed517cf-52af-4c78-be11-b7a28e2f2f58' alt="다음"></img></button>
                                    </div>
                                    <footer className="calendar_footer">
                                        <div className="mb_claendar_date">
                                            <p>{clickCheckIn === null ? formatDate(new Date()) : formatDate(clickCheckIn)} - {formatDate(clickCheckOut)}</p>
                                            <span>{night}박</span>
                                            <p>모든 날짜는 현지 시간 기준입니다.</p>
                                        </div>
                                        <button className="calendar_set_btn" onClick={setCheckDay}>적용</button>
                                    </footer>
                                </>
                                :
                                <>
                                    <div className="calendar" ref={calendarBoxRef}>
                                        <header className="calendar_header">
                                            {media > 1 ?
                                                <>
                                                    {renderMonth(months[currentIndex])}
                                                    {renderMonth(months[(currentIndex + 1) % months.length])}
                                                </>
                                                :
                                                <>
                                                    {months.map(renderMonth)}
                                                </>
                                            }
                                        </header>
                                        <button className='calendarPrev' onClick={() => setCalenderPrev(setCurrentIndex, 0)}><img src='https://github.com/simjsik/savefile/assets/39624384/d99b0090-cf55-4f4d-ad23-59f124992614' alt="이전"></img></button>
                                        <button className='calendarNext' onClick={() => setCalenderNext(setCurrentIndex, months.length - 2)}><img src='https://github.com/simjsik/savefile/assets/39624384/3ed517cf-52af-4c78-be11-b7a28e2f2f58' alt="다음"></img></button>
                                        <footer className="calendar_footer">
                                            <div className="mb_claendar_date">
                                                <p>{clickCheckIn === null ? formatDate(new Date()) : formatDate(clickCheckIn)} - {formatDate(clickCheckOut)}</p>
                                                <span>{night}박</span>
                                                <p>모든 날짜는 현지 시간 기준입니다.</p>
                                            </div>
                                            <button className="calendar_set_btn" onClick={setCheckDay}>적용</button>
                                        </footer>
                                    </div>
                                </>
                            }

                        </>
                    }
                </div>
            </div>
            <div className='hs_person'>
                <p>객실당 인원 수</p>
                <div className="hs_person_cont" onClick={toggleSetter}>
                    <span>{`객실 ${room}개, 성인 ${adult}명, 어린이 ${child}명`}</span>
                </div>
                {
                    setter === true && media > 1 ? <div className="setting_box" ref={settingBoxRef}>
                        <div className="setting_box_options">
                            <span>객실</span>
                            <div>
                                <button onClick={(event) => decreBtn(event, setRoom, 1)}><img src="https://github.com/simjsik/savefile/assets/39624384/81074449-6762-4ba7-a088-a00a585886c5" alt="navImg"></img></button>
                                <p>{room}</p>
                                <button onClick={(event) => increBtn(event, setRoom, 10)}><img src="https://github.com/simjsik/savefile/assets/39624384/664f1cd2-1c18-43ee-9066-d51065b4c938" alt="navImg"></img></button>
                            </div>
                        </div>
                        <div className="setting_box_options">
                            <span>성인</span>
                            <div>
                                <button onClick={(event) => decreBtn(event, setAdult, 1)}><img src="https://github.com/simjsik/savefile/assets/39624384/81074449-6762-4ba7-a088-a00a585886c5" alt="navImg"></img></button>
                                <p>{adult}</p>
                                <button onClick={(event) => increBtn(event, setAdult, capacity)}><img src="https://github.com/simjsik/savefile/assets/39624384/664f1cd2-1c18-43ee-9066-d51065b4c938" alt="navImg"></img></button>
                            </div>
                        </div>
                        <div className="setting_box_options">
                            <span>어린이</span>
                            <div>
                                <button onClick={(event) => decreBtn(event, setChild, 0)}><img src="https://github.com/simjsik/savefile/assets/39624384/81074449-6762-4ba7-a088-a00a585886c5" alt="navImg"></img></button>
                                <p>{child}</p>
                                <button onClick={(event) => increBtn(event, setChild, 10)}><img src="https://github.com/simjsik/savefile/assets/39624384/664f1cd2-1c18-43ee-9066-d51065b4c938" alt="navImg"></img></button>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
            <div className="search_box" onClick={searchClick}>
                <p>검색</p>
            </div>
            {
                setter === true && media < 2 ?
                    <>
                        <div className="setting_box_bg" onClick={toggleSetter}></div>
                        <div className="setting_box" ref={settingBoxRef}>
                            <div className="setting_box_top">
                                <p>객실 정보</p>
                                <button onClick={toggleSetter}>적용</button>
                            </div>
                            <div className="setting_box_options">
                                <span>객실</span>
                                <div>
                                    <button onClick={(event) => decreBtn(event, setRoom, 1)}><img src="https://github.com/simjsik/savefile/assets/39624384/81074449-6762-4ba7-a088-a00a585886c5" alt="navImg"></img></button>
                                    <p>{room}</p>
                                    <button onClick={(event) => increBtn(event, setRoom, 10)}><img src="https://github.com/simjsik/savefile/assets/39624384/664f1cd2-1c18-43ee-9066-d51065b4c938" alt="navImg"></img></button>
                                </div>
                            </div>
                            <div className="setting_box_options">
                                <span>성인</span>
                                <div>
                                    <button onClick={(event) => decreBtn(event, setAdult, 1)}><img src="https://github.com/simjsik/savefile/assets/39624384/81074449-6762-4ba7-a088-a00a585886c5" alt="navImg"></img></button>
                                    <p>{adult}</p>
                                    <button onClick={(event) => increBtn(event, setAdult, capacity)}><img src="https://github.com/simjsik/savefile/assets/39624384/664f1cd2-1c18-43ee-9066-d51065b4c938" alt="navImg"></img></button>
                                </div>
                            </div>
                            <div className="setting_box_options">
                                <span>어린이</span>
                                <div>
                                    <button onClick={(event) => decreBtn(event, setChild, 0)}><img src="https://github.com/simjsik/savefile/assets/39624384/81074449-6762-4ba7-a088-a00a585886c5" alt="navImg"></img></button>
                                    <p>{child}</p>
                                    <button onClick={(event) => increBtn(event, setChild, 10)}><img src="https://github.com/simjsik/savefile/assets/39624384/664f1cd2-1c18-43ee-9066-d51065b4c938" alt="navImg"></img></button>
                                </div>
                            </div>
                        </div>
                    </>
                    : null
            }
            {
                media < 2 && (location.pathname === '/detail' || location.pathname === '/reserve') && mbCalender &&
                <>
                    <div className='mb_calendar_top_nav'>
                        <div className="mb_calendar_close" onClick={toggleCalender}></div>
                        <p>날짜 선택</p>
                        <div className='calendar_week'>
                            <span>일</span>
                            <span>월</span>
                            <span>화</span>
                            <span>수</span>
                            <span>목</span>
                            <span>금</span>
                            <span>토</span>
                        </div>
                    </div>
                    <div className="calendar" ref={calendarBoxRef}>
                        <header className="calendar_header">

                            {media > 1 ?
                                <>
                                    {renderMonth(months[currentIndex])}
                                    {renderMonth(months[(currentIndex + 1) % months.length])}
                                </>
                                :
                                <>
                                    {months.map(renderMonth)}
                                </>
                            }
                        </header>
                        <button className='calendarPrev' onClick={() => setCalenderPrev(setCurrentIndex, 0)}><img src='https://github.com/simjsik/savefile/assets/39624384/d99b0090-cf55-4f4d-ad23-59f124992614' alt="이전"></img></button>
                        <button className='calendarNext' onClick={() => setCalenderNext(setCurrentIndex, months.length - 2)}><img src='https://github.com/simjsik/savefile/assets/39624384/3ed517cf-52af-4c78-be11-b7a28e2f2f58' alt="다음"></img></button>
                    </div>
                    <footer className="calendar_footer">
                        <div className="mb_claendar_date">
                            <p>{clickCheckIn === null ? formatDate(new Date()) : formatDate(clickCheckIn)} - {formatDate(clickCheckOut)}</p>
                            <span>{night}박</span>
                            <p>모든 날짜는 현지 시간 기준입니다.</p>
                        </div>
                        <button className="calendar_set_btn" onClick={setCheckDay}>적용</button>
                    </footer>
                </>
            }
            {
                media < 2 && (location.pathname === '/detail' || location.pathname === '/reserve') && mbSetter &&
                <>
                    <div className="setting_box_bg" onClick={toggleSetter}></div>
                    <div className="setting_box" ref={settingBoxRef}>
                        <div className="setting_box_top">
                            <p>객실 정보</p>
                            <button onClick={toggleSetter}>적용</button>
                        </div>
                        <div className="setting_box_options">
                            <span>객실</span>
                            <div>
                                <button onClick={(event) => decreBtn(event, setRoom, 1)}><img src="https://github.com/simjsik/savefile/assets/39624384/81074449-6762-4ba7-a088-a00a585886c5" alt="navImg"></img></button>
                                <p>{room}</p>
                                <button onClick={(event) => increBtn(event, setRoom, 10)}><img src="https://github.com/simjsik/savefile/assets/39624384/664f1cd2-1c18-43ee-9066-d51065b4c938" alt="navImg"></img></button>
                            </div>
                        </div>
                        <div className="setting_box_options">
                            <span>성인</span>
                            <div>
                                <button onClick={(event) => decreBtn(event, setAdult, 1)}><img src="https://github.com/simjsik/savefile/assets/39624384/81074449-6762-4ba7-a088-a00a585886c5" alt="navImg"></img></button>
                                <p>{adult}</p>
                                <button onClick={(event) => increBtn(event, setAdult, capacity)}><img src="https://github.com/simjsik/savefile/assets/39624384/664f1cd2-1c18-43ee-9066-d51065b4c938" alt="navImg"></img></button>
                            </div>
                        </div>
                        <div className="setting_box_options">
                            <span>어린이</span>
                            <div>
                                <button onClick={(event) => decreBtn(event, setChild, 0)}><img src="https://github.com/simjsik/savefile/assets/39624384/81074449-6762-4ba7-a088-a00a585886c5" alt="navImg"></img></button>
                                <p>{child}</p>
                                <button onClick={(event) => increBtn(event, setChild, 10)}><img src="https://github.com/simjsik/savefile/assets/39624384/664f1cd2-1c18-43ee-9066-d51065b4c938" alt="navImg"></img></button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div >
    )
}



export default MainFinder

