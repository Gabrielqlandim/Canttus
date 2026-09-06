export function Logo(){
    return (
        <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 11L12 4L21 11" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 10V19C5 19.5523 5.44772 20 6 20H9V15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15V20H18C18.5523 20 19 19.5523 19 19V10" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xl font-bold text-green-600">Canttus</span>
        </div>
    )
}