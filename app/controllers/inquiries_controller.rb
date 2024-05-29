class InquiriesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    @inquiry = Inquiry.new
  end

  def confirm
    @inquiry = Inquiry.new(inquiry_params)
    if @inquiry.invalid?
      render :new
    end
  end

  def back
    @inquiry = Inquiry.new(inquiry_params)
    render :new
  end

  def create
    @inquiry = Inquiry.new(inquiry_params)
    if @inquiry.save
      InquiryMailer.send_inquiry(@inquiry).deliver_now
      redirect_to thank_you_path
    else
      render :new
    end
  end

  def thank_you; end

  private

  def inquiry_params
    params.require(:inquiry).permit(:name, :email, :message)
  end
end
