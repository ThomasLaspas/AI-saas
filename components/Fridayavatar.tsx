import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
function Fridayavatar() {


    return (
        <Avatar className="sm:block hidden" >
            <AvatarImage src="https://play-lh.googleusercontent.com/znmIbBlC6gP6AoYh-To8Qn__jqm3ss10YYXyB34zDThpFTMUmGt7cMaM4th6rDJSNA=w240-h480-rw" />
            <AvatarFallback>F</AvatarFallback>
        </Avatar>

    )
}

export default Fridayavatar