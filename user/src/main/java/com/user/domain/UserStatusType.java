package com.user.domain;

public enum UserStatusType {
  AVAILABLE("available"),
  SUSPENDED("suspended"),
  DEACTIVATED("deactivated");

  private final String status;

  UserStatusType(String status) {
    this.status = status;
  }

  public String getStatus() {
    return status;
  }
}