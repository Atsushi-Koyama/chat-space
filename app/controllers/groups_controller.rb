class GroupsController < ApplicationController
  before_action :set_users, only: [:new, :create]


  def index
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    @group.users << current_user
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      flash.now[:alert] = 'チャットグループが作成できませんでした。'
      render :new
    end
  end


  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      flash.now[:alert] = 'チャットグループが編集できませんでした。'
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [] )
  end

  def set_users
    @users = User.where.not(id: current_user)
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
