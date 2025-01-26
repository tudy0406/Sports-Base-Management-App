package org.example.backend4.dto;

import java.sql.Time;

public class HourSent {
    private Time startTime;
    private Time endTime;

    public HourSent(Time startTime, Time endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time startTime) {
        this.startTime = startTime;
    }

    public Time getEndTime() {
        return endTime;
    }

    public void setEndTime(Time endTime) {
        this.endTime = endTime;
    }

    @Override
    public String toString() {
        return "HourSent [startTime=" + startTime + ", endTime=" + endTime + "]";
    }
}

