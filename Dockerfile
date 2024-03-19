FROM ruby:3.3.0
ENV LANG C.UTF-8
ENV TZ Asia/Tokyo
RUN curl -sL https://deb.nodesource.com/setup_21.x | bash - \
&& apt-get update -qq \
&& apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /Hokuriku-shien-Travelers-map
WORKDIR /Hokuriku-shien-Travelers-map
COPY Gemfile /Hokuriku-shien-Travelers-map/Gemfile
COPY Gemfile.lock /Hokuriku-shien-Travelers-map/Gemfile.lock
RUN gem install bundler && bundle install
COPY package.json /Hokuriku-shien-Travelers-map/package.json
COPY package-lock.json /Hokuriku-shien-Travelers-map/package-lock.json
RUN npm install
COPY . /Hokuriku-shien-Travelers-map
