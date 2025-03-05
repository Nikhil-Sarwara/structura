import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarImage } from "@radix-ui/react-avatar";
import { FaUser } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <Card className="p-6 shadow-xl">
                <CardContent className="flex flex-col items-center space-y-6">
                    {/* <Avatar className="w-24 h-24">
                        <AvatarImage alt="Vercel Logo" className="flex items-center justify-center">
                        </AvatarImage>
                        <AvatarFallback>404</AvatarFallback>
                    </Avatar> */}
                    <FaUser className="w-6 h-6" />
                    <h1 className="text-6xl font-bold text-primary">404</h1>
                    <h2 className="text-2xl text-muted-foreground">Page Not Found</h2>
                    <p className="text-lg text-center text-muted-foreground">
                        Oops! The page you are looking for does not exist or has been moved.
                    </p>
                    <Button variant="default" asChild>
                        <a href="/">Go Back Home</a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

