class InquiryMailer < ApplicationMailer
  def send_inquiry(inquiry)
    @inquiry = inquiry
    mail to: ENV["MAIL_ADDRESS"], subject: "お問い合わせがありました"
  end
end
