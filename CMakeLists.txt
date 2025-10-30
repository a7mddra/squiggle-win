cmake_minimum_required(VERSION 3.16)
project(drawview VERSION 1.0.0 LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTORCC ON)
find_package(Qt6 REQUIRED COMPONENTS Core Gui Widgets)
add_executable(drawview
    WIN32
    src/main.cpp
    src/Window.cpp
    src/Window.h
)
target_link_libraries(drawview PRIVATE
    Qt::Core
    Qt::Gui
    Qt::Widgets
)
target_include_directories(drawview PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/src
)
install(TARGETS drawview
    RUNTIME DESTINATION bin
)
if(CMAKE_SYSTEM_NAME STREQUAL "Windows")
    set_target_properties(drawview PROPERTIES
        VERSION ${PROJECT_VERSION}
        DESCRIPTION "A cross-platform screenshot utility."
    )
  
    target_link_libraries(drawview PRIVATE dwmapi)
  
endif()