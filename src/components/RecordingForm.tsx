import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type RecordingOptions = {
  frameRate: number
  format: string
  duration: number
  bitrate: number
}

type RecordingFormProps = {
  isRecording: boolean
  onStartRecording: (options: RecordingOptions) => void
}

const supportedMimeTypes = [
  "video/webm; codecs=vp9",
  "video/webm; codecs=vp8",
  "video/mp4; codecs=h.264",
  "video/webm",
  "video/webm",
]

export const RecordingForm: React.FC<RecordingFormProps> = ({
  isRecording,
  onStartRecording,
}) => {
  const [recordingOptions, setRecordingOptions] = useState<RecordingOptions>({
    frameRate: 30,
    format: "video/webm; codecs=vp9",
    duration: 30,
    bitrate: 10_000_000,
  })
  const [mimeTypes, setMimeTypes] = useState<string[]>([])

  useEffect(() => {
    // --- Find the supported mimeTypes ---
    const bestSupportedMimeTypes = supportedMimeTypes.filter((mimeType) =>
      MediaRecorder.isTypeSupported(mimeType)
    )

    if (!bestSupportedMimeTypes) {
      console.error("No supported video format found for MediaRecorder")
      alert("No supported video format found for MediaRecorder")
    }

    setMimeTypes(bestSupportedMimeTypes)
  }, [])

  return (
    <Card className="absolute top-4 left-4 z-10 w-80">
      <CardHeader>
        <CardTitle>Recording Options</CardTitle>
        <CardDescription>Configure and start recording</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="format">Format</Label>
          <Select
            value={recordingOptions.format}
            onValueChange={(value) =>
              setRecordingOptions((prev) => ({
                ...prev,
                format: value as "webm" | "mp4",
              }))
            }
          >
            <SelectTrigger id="format">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              {mimeTypes.map((mt) => (
                <SelectItem key={mt} value={mt}>
                  {mt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="framerate">Frame Rate</Label>
          <Select
            value={String(recordingOptions.frameRate)}
            onValueChange={(value) =>
              setRecordingOptions((prev) => ({
                ...prev,
                frameRate: Number(value),
              }))
            }
          >
            <SelectTrigger id="framerate">
              <SelectValue placeholder="Select frame rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 fps</SelectItem>
              <SelectItem value="60">60 fps</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (seconds)</Label>
          <Input
            id="duration"
            type="number"
            value={recordingOptions.duration}
            onChange={(e) =>
              setRecordingOptions((prev) => ({
                ...prev,
                duration: Number(e.target.value),
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bitrate">Bitrate (bits/s)</Label>
          <Input
            id="bitrate"
            type="number"
            step="100000"
            value={recordingOptions.bitrate}
            onChange={(e) =>
              setRecordingOptions((prev) => ({
                ...prev,
                bitrate: Number(e.target.value),
              }))
            }
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => onStartRecording(recordingOptions)}
          disabled={isRecording || mimeTypes.length === 0}
          className="w-full cursor-pointer"
        >
          {isRecording
            ? `Recording... (${recordingOptions.duration}s)`
            : `Record ${recordingOptions.duration}s Video`}
        </Button>
      </CardFooter>
    </Card>
  )
}
