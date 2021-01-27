package com.java.poly;

public class AXIS extends Bank {
	
	@Override
	public void setInterest(double interest) {
		super.interest=9.50;
	}
	
	public String calulate() {
		return "Interest Amount of AXIS is "+(amount+((getInterest()/100)*amount))+".";
	}

}
