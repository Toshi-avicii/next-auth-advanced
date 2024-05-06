import Header from "./Header"
import BackButton from "./BackButton"
import {
    Card,
    CardHeader,
    CardFooter
} from '../ui/card';

function ErrorCard() {
  return (
    <Card className="w-[400px] shadow-md">
        <CardHeader>
            <Header label="Oops: Something went wrong!" />
        </CardHeader>
        <CardFooter>
            <BackButton 
                label="Back to login"
                href="/auth/login"
            />
        </CardFooter>
    </Card>
  )
}

export default ErrorCard
