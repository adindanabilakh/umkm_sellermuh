import * as React from "react"
import { Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface TimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(({ label, ...props }, ref) => {
  return (
    <div className="relative">
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <div className="relative">
        <Input type="time" ref={ref} {...props} className="pl-10" />
        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  )
})

TimePicker.displayName = "TimePicker"

