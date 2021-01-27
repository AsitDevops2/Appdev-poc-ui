package com.java.poly;

public class SBI extends Bank {

	@Override
	public void setInterest(int interest) {
		super.interest=8;
	}
	
	public String calulate() {
		return "Interest Amount of SBI is "+(amount+((getInterest()/100)*amount))+".";
	}
}
