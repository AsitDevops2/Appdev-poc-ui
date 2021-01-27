package com.java.poly;

public class ICICI extends Bank {
	
	@Override
	public void setInterest(float interest) {
		super.interest=7.3f;
	}
	
	public String calulate() {
		return "Interest Amount of ICICI is "+(amount+((getInterest()/100)*amount))+".";
	}

}
