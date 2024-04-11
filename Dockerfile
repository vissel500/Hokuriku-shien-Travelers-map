FROM ruby:3.3.0
ENV LANG C.UTF-8
ENV TZ Asia/Tokyo
ENV RAILS_ENV=production
RUN curl -sL https://deb.nodesource.com/setup_21.x | bash - \
&& wget --quiet -O - /tmp/pubkey.gpg https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
&& echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
&& apt-get update -qq \
&& apt-get install -y build-essential libpq-dev nodejs yarn
RUN mkdir /Hokuriku-shien-Travelers-map
WORKDIR /Hokuriku-shien-Travelers-map
COPY Gemfile /Hokuriku-shien-Travelers-map/Gemfile
COPY Gemfile.lock /Hokuriku-shien-Travelers-map/Gemfile.lock
RUN gem install bundler
COPY package.json /Hokuriku-shien-Travelers-map/package.json
COPY yarn.lock /Hokuriku-shien-Travelers-map/yarn.lock
RUN bundle install
RUN yarn install
COPY . /Hokuriku-shien-Travelers-map
