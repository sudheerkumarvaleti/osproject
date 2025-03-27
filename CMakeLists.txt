cmake_minimum_required(VERSION 3.10)
project(EnergyEfficientScheduler)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(scheduler
    main.cpp
    Process.cpp
    Scheduler.cpp
)

target_include_directories(scheduler PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}) 