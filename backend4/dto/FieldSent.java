package org.example.backend4.dto;

public class FieldSent {
    private int id;
    private String name;
    private int sportId;
    private String sportName;
    private int length;
    private int width;
    private double hourPrice;

    public FieldSent(int id, String name, int sportId, String sportName, int length, int width, double hourPrice) {
        this.id = id;
        this.name = name;
        this.sportId = sportId;
        this.sportName = sportName;
        this.length = length;
        this.width = width;
        this.hourPrice = hourPrice;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public String getSportName() {
        return sportName;
    }

    public void setSportName(String sportName) {
        this.sportName = sportName;
    }

    public int getSportId() {
        return sportId;
    }

    public void setSportId(int sportId) {
        this.sportId = sportId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getHourPrice(){
        return this.hourPrice;
    }

    public void setHourPrice(double hourPrice){
        this.hourPrice = hourPrice;
    }

    @Override
    public String toString() {
        return String.format("FieldSent[id = %d, name = %s, sportId = %d, sport = %s]", id, name, sportId, sportName);
    }
}
