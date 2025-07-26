import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';

export function Chat() {
  return (
    <Card className="flex flex-col h-[450px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <MessageSquare className="h-5 w-5" />
          Chat with Fresh Farms Co.
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 overflow-y-auto">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="farmer profile" />
            <AvatarFallback>FF</AvatarFallback>
          </Avatar>
          <div className="p-3 rounded-lg bg-secondary max-w-[80%]">
            <p className="text-sm">
              Hello! We have fresh potatoes and onions available. Let me know
              your requirement.
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <div className="p-3 rounded-lg bg-primary text-primary-foreground max-w-[80%]">
            <p className="text-sm">
              Great! I need 10kg potatoes and 5kg onions. What's the best price
              you can offer?
            </p>
          </div>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <div className="flex w-full items-center space-x-2">
          <Input type="text" placeholder="Type a message..." className="flex-1" />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
